const fs = require('fs')
const convert = require('xml-js')
const { capitalCase } = require('change-case')
console.log('Parsing WQX All Domain Values XML ...')

const run = async () => {
// parse xml for allowed values schemas
  let xml
  try {
    xml = fs.readFileSync(__dirname + '/../All Domain Values.xml', 'utf8')
  } catch (e) {
    //console.log('Downloading XML from WQX (~300MB)')
    //xml = await fetch('https://cdx.epa.gov/wqx/download/DomainValues/All.zip').then(res => res.text())
  }
  console.log('Parsing XML')
  const values = JSON.parse(convert.xml2json(xml, { compact: true }))

  const requiredMapping = {
    'ActivityType': 'ActivityType',
    'AnalyticalMethod': ['ResultAnalyticalMethodID', 'ResultAnalyticalMethodContext'],
    'MonitoringLocation': ['MonitoringLocationType'],
    'Characteristic': 'CharacteristicName',
    'MethodSpeciation': ['MethodSpeciation'],
    'SampleFraction': ['ResultSampleFraction'],
  }

  console.log('Building Values')
  const jsonSchema = {}
  for (let e in values.WQXDomainValueList.WQXElement) {
    const field = values.WQXDomainValueList.WQXElement[e].WQXElementName._text
      .replace(/\s+/g, '')
      .replace(/\//g, '')
      .replace(/\(.*\)$/, '')

    const element = values.WQXDomainValueList.WQXElement[e].WQXElementRow

    jsonSchema[field] = {
      title: capitalCase(field),
      description: '',
      type: 'string',
      enum: [],
      maxLength: 0
    }
    let group = {}
    let characteristicCASNumber = {}

    let required = {}
    let deprecated = []

    for (let r in element) {
      const row = element[r].WQXElementRowColumn || element[r]
      const rowObj = {}

      // re-org
      for (let c in row) {
        const col = row[c]._attributes

        if (col.colname === 'DomainValueStatus') {
          col.value = col.value === 'Accepted'
        }

        if (col.colname.includes('Required')) {
          col.colname = col.colname.replace('Required', '')
          col.value = col.value === 'Y'

          if (!required[col.colname]) {
            required[col.colname] = {
              'if': {
                'properties': {
                  [requiredMapping[field]]: { 'enum': [] }
                },
                'required': [requiredMapping[field]]
              },
              'then': {
                'required': requiredMapping[col.colname]
              }
            }
          }
        }

        rowObj[col.colname] = col.value
      }

      // enum values
      let value = ''
      if (Object.keys(rowObj).includes('ID')) {
        value = rowObj['ID']
      } else if (Object.keys(rowObj).includes('Characteristic')) {  // CharacteristicPickListValue
        value = rowObj['Characteristic']
      } else if (Object.keys(rowObj).includes('Code')) {
        value = rowObj['Code']
      } else if (Object.keys(rowObj).includes('CountyFIPSCode')) {  // County
        value = rowObj['CountyName'] + ', ' + rowObj['StateCode']
      } else {
        value = rowObj['Name'] || rowObj['AliasName']
      }

      if (!value) {
        console.log(field, JSON.stringify(element[r], null, 2), rowObj)
      }

      // deprecated value
      if (Object.keys(rowObj).includes('DomainValueStatus') && !rowObj['DomainValueStatus']) {
        deprecated.push(value)
      }

      // Groups
      // Characteristic => GroupName
      if (Object.keys(rowObj).includes('GroupName')) {
        group[value.split('***retired***')[0]] = rowObj['GroupName']
      }

      // Group Lookups
      if (Object.keys(rowObj).includes('CASNumber')) {
        characteristicCASNumber[value.split('***retired***')[0]] = rowObj['CASNumber']
      }

      // Required
      Object.keys(required).forEach(col => {
        // TODO optimization, split into permutations A,A*B,B,B*C,C,A*C,A*B*C
        if (rowObj[col]) {
          required[col].if.properties[requiredMapping[field]].enum.push(value)
        }
      })

      jsonSchema[field].maxLength = Math.max(jsonSchema[field].maxLength, value.length)
      if (jsonSchema[field].enum.includes(value)) {
        if (!field.includes('Alias')) console.log(`duplicate found in ${field}`, value)
      } else {
        jsonSchema[field].enum.push(value)
      }
    }

    console.log('Save', field)
    fs.writeFileSync(__dirname + `/../src/values/${field}.json`, JSON.stringify(jsonSchema[field], null, 2), 'utf8')

    if (deprecated.length) {
      fs.writeFileSync(__dirname + `/../src/deprecated/${requiredMapping[field] || field}.json`, JSON.stringify(deprecated, null, 2), 'utf8')
    }
    if (Object.keys(group).length) {
      fs.writeFileSync(__dirname + `/../src/groups/${requiredMapping[field] || field}.json`, JSON.stringify(group, null, 2), 'utf8')
    }
    if (Object.keys(characteristicCASNumber).length) {
      fs.writeFileSync(__dirname + `/../src/groups/CASNumber.json`, JSON.stringify(characteristicCASNumber, null, 2), 'utf8')
    }
    Object.keys(required).forEach(col => {
      console.log('>', col)
      fs.writeFileSync(__dirname + `/../src/required/${requiredMapping[field]}-${requiredMapping[col].join('-')}.json`, JSON.stringify(required[col], null, 2), 'utf8')
    })
  }

//fs.writeFileSync(__dirname+'/../src/definitions.values.json', JSON.stringify(jsonSchema, null, 2), 'utf8');
  console.log('Done!')
}
run()