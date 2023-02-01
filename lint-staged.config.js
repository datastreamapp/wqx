export default {
  '{src,bin}/**/*.js': ['prettier --write', 'standard --fix'],
  'src/**/*.json': ['prettier --write']
}
