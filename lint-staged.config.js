export default {
  '**/!(charset|digest|schema).js': ['prettier --write', 'standard --fix'],
  '**/*.{json}': ['prettier --write']
}
