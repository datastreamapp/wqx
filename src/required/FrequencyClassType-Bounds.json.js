export default {
  if: {
    type: 'object',
    unevaluatedProperties: false,
    properties: {
      FrequencyClassType: {
        enum: ['Measured Characteristic']
      }
    },
    required: ['FrequencyClassType']
  },
  then: {
    type: 'object',
    unevaluatedProperties: false,
    properties: {
      Bounds: true
    },
    required: ['Bounds']
  }
}
