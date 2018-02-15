<h1 align="center">
  <img src="https://raw.githubusercontent.com/gordonfn/wqx/master/docs/images/water-quality-exchange.gif" alt="WQX Logo" width="200">
  <br>
  Water Quality Exchange (WQX): JSON Schema and JSON Table Schema
  <br>
  <br>
</h1>

<p align="center">
  <a href="https://github.com/gordonfn/wqx"><img src="https://img.shields.io/github/stars/gordonfn/wqx.svg?style=social&label=Stars" alt="Stars" /></a>
  <a href="https://www.npmjs.com/package/wqx"><img src="https://img.shields.io/npm/v/wqx.svg" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/wqx"><img src="https://img.shields.io/npm/dm/wqx.svg" alt="npm downloads"></a>
  <a href="https://www.npmjs.com/package/wqx"><img src="https://img.shields.io/npm/l/wqx.svg" alt="npm license" /></a>
  <a href="http://packagequality.com/#?package=wqx"><img src="http://npm.packagequality.com/shield/wqx.svg" alt="Package Quality" /></a>
</p>

## Sponsored By
<div align="center">
  <a href="http://gordonfoundation.ca"><img src="https://raw.githubusercontent.com/gordonfn/wqx/master/docs/images/the-gordon-foundation.svg?sanitize=true" alt="The Gordon Foundation Logo" width="200"></a>
</div>

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
- `physical-chemistry`

### JSON Schema

### JSON Table Schema

## Use
```javascript
const Ajv = require('ajv');
const jsonschema = requrie('wqx/json-schema/biological.json');


```


## Contributing

### Building `definitions.wqx.values.json`
```bash
$ npm run build:values
```

### Contributors
- [willfarrell](https://github.com/willfarrell)

## References
- [About](https://www3.epa.gov/storet/archive/web/wqx.html)
- [Web Template Files](https://www.epa.gov/waterdata/water-quality-exchange-web-template-files)
- [Schema (XML)](http://www.exchangenetwork.net/data-exchange/wqx/)
- [Schema Allowed Values (XML)](http://www.epa.gov/storet/wqx/wqx_getdomainvalueswebservice.html)


## TODO
- [ ] script to generate docs
  - [ ] ability to search allowed values
- [ ] wqx schemas should be namespaced in npm
- [ ] add file level definitions to help minimize size
- [ ] script to build json-schema
- [ ] script to build json-table-schema

<div align="center">
  <h3>Maintained By</h3>
  <a href="https://tesera.com"><img src="https://raw.githubusercontent.com/gordonfn/wqx/master/docs/images/tesera.png" alt="Tesera Systems Inc. Logo" width="200"></a>
</div>
