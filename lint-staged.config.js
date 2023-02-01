export default {
  '**/*.js': ['prettier --write', 'standard --fix'],
  'src/**/*.{json}': ['prettier --write']
}
