const fs = require('fs');
const convert = require('xml-js');

console.log('Parsing WQX All Domain Values XML ...');

// download and unzip http://cdx.epa.gov/wqx/download/DomainValues/All.zip
// parse xml for allowed values schemas
const xml = require('fs').readFileSync(__dirname+'/../xml/All Domain Values.xml', 'utf8');
const values = JSON.parse(convert.xml2json(xml, {compact: true}));

const jsonSchema = {
    title:'Allowed Values',
    description:'WQX Allowed Values Definitions',
    // Missing from file, subsets of MeasurementUnit
    AreaMeasurementUnit: {
        title: 'Area Measurement Unit',
        description: '',
        type: 'string',
        enum: ['cm3','in3','ft3', 'm3']
    },
    DistanceMeasurementUnit: {
        title: 'Distance Measurement Unit',
        description: '',
        type: 'string',
        enum: ['cm','in','ft', 'm', 'km']
    },
    TimeMeasurementUnit: {
        title: 'Time Measurement Unit',
        description: '',
        type: 'string',
        enum: ['seconds','minutes','hours','weeks','months','years']
    },
    SpeedMeasurementUnit: {
        title: 'Speed Measurement Unit',
        description: '',
        type: 'string',
        enum: ['cm/sec','ft/sec','m/sec','km/sec','km/hr']
    },
    MassMeasurementUnit: {
        title: 'Mass Measurement Unit',
        description: '',
        type: 'string',
        enum: ['g','oz','lb','kg']
    }
};
for (let e in values.WQXDomainValueList.WQXElement) {
    const field = values.WQXDomainValueList.WQXElement[e].WQXElementName._text.replace('\n', '').replace('/', '').trim();
    const element = values.WQXDomainValueList.WQXElement[e].WQXElementRow;

    jsonSchema[field] = {
        title: field,
        description:'',
        type:'string',
        enum:[],
        maxLength:0
    };
    for (let r in element) {
        const row = element[r].WQXElementRowColumn || element[r];
        const rowObj = {};

        // re-org
        for (let c in row) {
            console.log(c);
            const col = row[c]._attributes;
            rowObj[col.colname] = col.value;
        }

        let value = '';
        if (Object.keys(rowObj).indexOf('ID') !== -1) {
            value = rowObj['ID'];
        } else if (Object.keys(rowObj).indexOf('Characteristic') !== -1) {  // CharacteristicPickListValue
            value = rowObj['Characteristic'];
        } else if (Object.keys(rowObj).indexOf('Code') !== -1) {
            value = rowObj['Code'];
        } else if (Object.keys(rowObj).indexOf('CountyFIPSCode') !== -1) {  // County
            value = rowObj['CountyName']+', '+rowObj['StateCode'];
        } else {
            value = rowObj['Name'];
        }

        if (!value) {
            console.log(element[r], rowObj);
        }

        // meta data for docs
        // name = rowObj['Name'].replace(/( ?[A-Z])/g, ' $1');
        // description = rowObj['Description']
        jsonSchema[field].maxLength = Math.max(jsonSchema[field].maxLength, value.length);
        jsonSchema[field].enum.push(value);
    }
}

fs.writeFileSync(__dirname+'/../src/definitions.values.json', JSON.stringify(jsonSchema, null, 2), 'utf8');
console.log('Done!');
