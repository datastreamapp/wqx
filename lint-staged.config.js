export default {
  '**/!(charset|digest|schema).js': ['prettier --write', 'standard --fix'],
  '**/*.{scss,html,json}': ['prettier --write']
  // https://medium.com/slalom-build/pre-commit-hooks-for-terraform-9356ee6db882
  // '**/*.tf': [
  //   'terraform fmt -recursive -write',
  //   'tflint'
  // ]
}