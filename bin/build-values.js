import { readFile, writeFile } from 'fs/promises'
import { xml2js } from 'xml-js'
import { capitalCase } from 'change-case'

console.log('Parsing WQX All Domain Values XML ...')

const run = async () => {
  // parse xml for allowed values schemas
  let xml
  try {
    xml = await readFile('./All Domain Values.xml', 'utf8')
  } catch (e) {
    // console.log('Downloading XML from WQX (~300MB)')
    // xml = await fetch('https://cdx.epa.gov/wqx/download/DomainValues/All.zip').then(res => res.text())
  }
  console.log('Parsing XML')
  const values = xml2js(xml, { compact: true })

  const requiredMapping = {
    ActivityType: 'ActivityType',
    AnalyticalMethod: [
      'ResultAnalyticalMethodID',
      'ResultAnalyticalMethodContext'
    ],
    MonitoringLocation: ['MonitoringLocationType'],
    Characteristic: 'CharacteristicName',
    MethodSpeciation: ['MethodSpeciation'],
    SampleFraction: ['ResultSampleFraction'],

    FrequencyClassType: 'FrequencyClassType',
    Units: ['Units'],
    Bounds: ['Bounds']
  }

  console.log('Building Values')
  const jsonSchema = {}
  for (const e in values.WQXDomainValueList.WQXElement) {
    const field = values.WQXDomainValueList.WQXElement[e].WQXElementName._text
      .replace(/\s+/g, '')
      .replace(/\//g, '')
      .replace(/\(.*\)$/, '')

    const element = values.WQXDomainValueList.WQXElement[e].WQXElementRow

    jsonSchema[field] = {
      $id: `https://epa.gov/wqx/${field}`,
      title: capitalCase(field),
      description: '',
      type: 'string',
      enum: [],
      maxLength: 0
    }
    const group = {}
    const characteristicCASNumber = {}
    const descriptions = {}

    const required = {}
    const deprecated = []

    for (const r in element) {
      const row = element[r].WQXElementRowColumn || element[r]
      const rowObj = {}

      // re-org
      for (const c in row) {
        const col = row[c]._attributes

        if (col.colname === 'DomainValueStatus') {
          col.value = col.value === 'Accepted'
        }

        if (col.colname.includes('Required')) {
          col.colname = col.colname.replace('Required', '')
          col.value = col.value === 'Y'

          if (!required[col.colname]) {
            required[col.colname] = {
              if: {
                properties: {
                  [requiredMapping[field]]: { enum: [] }
                },
                required: [requiredMapping[field]]
              },
              then: {
                properties: {},
                required: requiredMapping[col.colname]
              }
            }
            // required to allow use of strict
            for (const property of requiredMapping[col.colname]) {
              required[col.colname].then.properties[property] = {}
            }
          }
        }

        rowObj[col.colname] = col.value
      }

      // enum values
      let value = ''
      if (Object.keys(rowObj).includes('ID')) {
        value = rowObj.ID
      } else if (Object.keys(rowObj).includes('Characteristic')) {
        // CharacteristicPickListValue
        value = rowObj.Characteristic
      } else if (Object.keys(rowObj).includes('Code')) {
        value = rowObj.Code
      } else if (Object.keys(rowObj).includes('CountyFIPSCode')) {
        // County
        value = rowObj.CountyName + ', ' + rowObj.StateCode
      } else {
        value = rowObj.Name || rowObj.AliasName
      }

      if (value !== value.trim()) {
        console.log(`Fixed trailing whitespace: "${value}"`)
        value = value.trim()
      }

      if (value.includes(' ')) {
        console.log(`Fixed nbsp: "${value}"`)
        value = value.replaceAll(' ', ' ')
      }

      if (['ethyl tert-butyl ether'].includes(value)) {
        console.log(`Fixed mixed-case duplicate: "${value}`)
        value = 'Ethyl tert-butyl ether'
      }

      if (!value) {
        console.log(field, JSON.stringify(element[r], null, 2), rowObj)
      }

      // deprecated value
      if (
        Object.keys(rowObj).includes('DomainValueStatus') &&
        !rowObj.DomainValueStatus
      ) {
        deprecated.push(value)
      }

      // Groups
      // Characteristic => GroupName
      if (Object.keys(rowObj).includes('GroupName')) {
        group[value.split('***retired***')[0]] = rowObj.GroupName
      }

      // Group Lookups
      if (Object.keys(rowObj).includes('CASNumber')) {
        characteristicCASNumber[value.split('***retired***')[0]] =
          rowObj.CASNumber
      }

      // Required
      Object.keys(required).forEach((col) => {
        // TODO optimization, split into permutations A,A*B,B,B*C,C,A*C,A*B*C
        if (rowObj[col]) {
          required[col].if.properties[requiredMapping[field]].enum.push(value)
        }
      })

      jsonSchema[field].maxLength = Math.max(
        jsonSchema[field].maxLength,
        value.length
      )
      if (jsonSchema[field].enum.includes(value)) {
        if (!field.includes('Alias')) {
          console.log(`duplicate found in ${field}`, value)
        }
      } else {
        jsonSchema[field].enum.push(value)
      }

      // Descriptions
      if (Object.keys(rowObj).includes('Description')) {
        descriptions[value] = rowObj.Description
      }
    }

    console.log('Save', field)
    await writeFile(
      `./src/values/${field}.json`,
      JSON.stringify(jsonSchema[field], null, 2),
      'utf8'
    )
    await writeFile(
      `./src/values/${field}.json.js`,
      'export default ' + JSON.stringify(jsonSchema[field], null, 2),
      'utf8'
    )

    if (deprecated.length) {
      await writeFile(
        `./src/deprecated/${requiredMapping[field] || field}.json`,
        JSON.stringify(deprecated, null, 2),
        'utf8'
      )
      await writeFile(
        `./src/deprecated/${requiredMapping[field] || field}.json.js`,
        'export default ' + JSON.stringify(deprecated, null, 2),
        'utf8'
      )
    }
    if (Object.keys(group).length) {
      await writeFile(
        `./src/groups/${requiredMapping[field] || field}.json`,
        JSON.stringify(group, null, 2),
        'utf8'
      )
      await writeFile(
        `./src/groups/${requiredMapping[field] || field}.json.js`,
        'export default ' + JSON.stringify(group, null, 2),
        'utf8'
      )
    }
    if (Object.keys(characteristicCASNumber).length) {
      await writeFile(
        './src/groups/CASNumber.json',
        JSON.stringify(characteristicCASNumber, null, 2),
        'utf8'
      )
      await writeFile(
        './src/groups/CASNumber.json.js',
        'export default ' + JSON.stringify(characteristicCASNumber, null, 2),
        'utf8'
      )
    }
    for (const col of Object.keys(required)) {
      console.log('>', field, '-', col)
      await writeFile(
        `./src/required/${requiredMapping[field]}-${requiredMapping[col].join(
          '-'
        )}.json`,
        JSON.stringify(required[col], null, 2),
        'utf8'
      )
      await writeFile(
        `./src/required/${requiredMapping[field]}-${requiredMapping[col].join(
          '-'
        )}.json.js`,
        'export default ' + JSON.stringify(required[col], null, 2),
        'utf8'
      )
    }

    if (Object.keys(descriptions).length) {
      await writeFile(
        `./src/descriptions/${field}.json`,
        JSON.stringify(descriptions, null, 2),
        'utf8'
      )
      await writeFile(
        `./src/descriptions/${field}.json.js`,
        'export default ' + JSON.stringify(descriptions, null, 2),
        'utf8'
      )
    }
  }

  // await writeFile(__dirname+'/../src/definitions.values.json', JSON.stringify(jsonSchema, null, 2), 'utf8');
  console.log('Done!')
}
run()
