export default {
  $id: 'https://epa.gov/wqx/ResultStatus',
  title: 'Result Status',
  description: '',
  type: 'string',
  enum: [
    'Accepted',
    'Final',
    'Preliminary',
    'Provisional',
    'Raw',
    'Rejected',
    'Supervised',
    'Unreviewed',
    'Validated'
  ],
  maxLength: 11
}
