<h1 align="center">
  <!--<img src="https://raw.githubusercontent.com/gordonfn/wqx/master/docs/images/water-quality-exchange.gif" alt="WQX Logo" width="200">-->
  <br>
  Water Quality Exchange (WQX)<br/>JSON Schema
  <br>
  <br>
</h1>

<p align="center">
  <a href="https://github.com/gordonfn/wqx"><img src="https://img.shields.io/github/stars/gordonfn/wqx.svg?style=social&label=Stars" alt="Stars" /></a>
  <a href="https://www.npmjs.com/package/wqx"><img src="https://img.shields.io/npm/v/wqx.svg" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/wqx"><img src="https://img.shields.io/npm/dm/wqx.svg" alt="npm downloads"></a>
  <a href="https://www.npmjs.com/package/wqx"><img src="https://img.shields.io/npm/l/wqx.svg" alt="npm license" /></a>
</p>

## Background

The WQX standard for the Exchange of Water Quality Data was developed by the US Environmental Protection Agency (EPA) and the US Geological Society (USGS) and is an implementation of the ESAR (Environmental Sampling, Analysis and Results) data standard. 

The Gordon Foundation transformed the WQX from its original XML format to json table schema.This was done using resources available on the following site: 
- https://www.epa.gov/waterdata/water-quality-data-wqx
- http://www.exchangenetwork.net/data-exchange/wqx/ 
- https://www3.epa.gov/storet/archive/web/wqx.html

In 2018, [The Gordon Foundation](http://gordonfoundation.ca) led a comprehensive review process to determine how this model could be adapted to best meet the needs of diverse water monitoring initiatives in Canada. The result is DataStream’s WQX Open Data Schema ([DS-WQX](https://github.com/gordonfn/schema)). 

DataStream ([www.DataStream.org](http://gordonfoundation.ca/initiatives/datastream)) is an online open-access platform for sharing water quality data in Canada. It was developed by The Gordon Foundation and carried out in collaboration with regional partners and monitoring networks. 

## Install
```bash
$ npm i wqx
```

## Schemas
- `project`
- `location`
- `activitymetric`
- `biological`
- `biological-habitat`
- `habitat`
- `instantaneous`
- `physical-chemistry`

## Use
```javascript
const jsonschema = requrie('wqx/json-schema/biological');
```


## Contributing

### Building `definitions.values.json`
This should only be run if the version of WQX is updated.
```bash
$ curl https://cdx.epa.gov/wqx/download/DomainValues/All.zip
$ unzip All.zip
$ npm run build:values
```

### Publishing
```bash
# update version in `package.json`
npm run build
cd dist
npm publish
```

### Contributors
- [willfarrell](https://github.com/willfarrell)

## References
- [US EPA WQX](https://www.epa.gov/waterdata/water-quality-data-wqx)
- [Web Template Files](https://www.epa.gov/waterdata/water-quality-exchange-web-template-files)
- [Schema (XML)](http://www.exchangenetwork.net/data-exchange/wqx/)
- [Schema Allowed Values](https://www.epa.gov/waterdata/storage-and-retrieval-and-water-quality-exchange-domain-services-and-downloads#domain)
- [US EPA WQX Historical](https://www3.epa.gov/storet/archive/web/wqx.html)

<div align="center">
  <a href="http://gordonfoundation.ca"><img src="https://raw.githubusercontent.com/gordonfn/wqx/master/docs/images/the-gordon-foundation.svg?sanitize=true" alt="The Gordon Foundation Logo" width="200"></a>
</div>

