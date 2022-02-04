import { promisify } from 'util'
import { parse, join } from 'path'
import { writeFile } from 'fs/promises'
import $RefParser from 'json-schema-ref-parser'
import metadata from './../package.json'
import glob from 'glob'
const globPromise = promisify(glob)

console.log('Building JSON Schema & JSON Table Schema')

// const valuesGlob = __dirname+'/../src/values/*.json';
const parentDir = './src'
const parentGlob = join(parentDir, '/*.json')
const jsonSchemaDir = './dist/json-schema'

delete metadata.scripts
delete metadata.devDependencies

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
  const parentFiles = await globPromise(parentGlob)
  await Promise.all(
    parentFiles.map((filePath) => {
      const parts = parse(filePath)
      const file = parts.base
      return process(file, definitions)
    })
  )

  // Finish
  console.log('Copy package.json')
  await writeFile('./dist/package.json', JSON.stringify(metadata, null, 2), {
    encoding: 'utf8'
  })

  console.log('Done!')
}

const process = async (file) => {
  console.log('Process', parentDir + '/' + file)
  const schemaJSON = await $RefParser.dereference(join(parentDir, file), {})
  console.log('Write', jsonSchemaDir + '/' + file)
  await writeFile(
    join(jsonSchemaDir, file),
    JSON.stringify(schemaJSON, null, 2),
    { encoding: 'utf8' }
  )
}

run()
