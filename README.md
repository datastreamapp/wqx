<h1 align="center">
  <img src="https://raw.githubusercontent.com/gordonfn/wqx/master/docs/images/water-quality-exchange.gif" alt="WQX Logo" width="200">
  <br>
  Water Quality Exchange (WQX)<br/>JSON Schema and JSON Table Schema
  <br>
  <br>
</h1>

<p align="center">
  <a href="https://github.com/gordonfn/wqx"><img src="https://img.shields.io/github/stars/gordonfn/wqx.svg?style=social&label=Stars" alt="Stars" /></a>
  <a href="https://www.npmjs.com/package/wqx"><img src="https://img.shields.io/npm/v/wqx.svg" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/wqx"><img src="https://img.shields.io/npm/dm/wqx.svg" alt="npm downloads"></a>
  <a href="https://www.npmjs.com/package/wqx"><img src="https://img.shields.io/npm/l/wqx.svg" alt="npm license" /></a>
</p>

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
$ npm run init
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
- [About](https://www3.epa.gov/storet/archive/web/wqx.html)
- [Web Template Files](https://www.epa.gov/waterdata/water-quality-exchange-web-template-files)
- [Schema (XML)](http://www.exchangenetwork.net/data-exchange/wqx/)
- [Schema Allowed Values (XML)](http://www.epa.gov/storet/wqx/wqx_getdomainvalueswebservice.html)
- [World Water Day - Mar 22](http://worldwaterday.org)

## TODO
- [ ] script to generate docs
  - [ ] ability to search allowed values
- [ ] add file level definitions to help minimize size

<div align="center">
  <a href="http://gordonfoundation.ca"><img src="https://raw.githubusercontent.com/gordonfn/wqx/master/docs/images/the-gordon-foundation.svg" alt="The Gordon Foundation Logo" width="200"></a>
</div>

