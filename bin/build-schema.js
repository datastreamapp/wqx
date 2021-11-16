const util = require('util');
const path = require('path');
const fs = require('fs');

const glob = util.promisify(require('glob'));
const $RefParser = require('json-schema-ref-parser');
const writeFile = util.promisify(fs.writeFile);

console.log('Building JSON Schema & JSON Table Schema');

//const valuesGlob = __dirname+'/../src/values/*.json';
const parentDir = __dirname+'/../src'
const parentGlob = parentDir+'/*.json';
const jsonSchemaDir = __dirname+'/../dist/json-schema';
//const jsonTableSchemaDir = __dirname+'/../dist/json-table-schema';

const run = async () => {
  // Collect common schemas
  const definitions = []
  // const valueFiles = await glob(valuesGlob)
  // valueFiles.forEach((filePath) => {
  //   const parts = path.parse(filePath);
  //   const file = parts.base;
  //   const json = require(file)
  //   definitions.push(json)
  // })

  // definitions
  // await process(__dirname+'/../src/definitions.json', definitions)
  // definitions.push(require(file))

  // schemas
  const parentFiles = await glob(parentGlob)
  await Promise.all(parentFiles.map((filePath) => {
    const parts = path.parse(filePath);
    const file = parts.base;
    return process(file, definitions)
  }))

  // Finish
  console.log('Copy package.json');
  const npm = require(__dirname+'/../package.json');

  delete npm.scripts;
  delete npm.devDependencies;

  fs.writeFileSync(__dirname+'/../dist/package.json', JSON.stringify(npm, null, 2), {encoding:'utf8'});

  console.log('Done!');
}

const process = async(file, definitions) => {
  console.log('Process', parentDir+'/'+file);
  const schemaJSON = await $RefParser.dereference(parentDir+'/'+file, {})
  console.log('Write', jsonSchemaDir + '/' + file);
  writeFile(jsonSchemaDir + '/' + file, JSON.stringify(schemaJSON, null, 2), {encoding:'utf8'})
}
run()
