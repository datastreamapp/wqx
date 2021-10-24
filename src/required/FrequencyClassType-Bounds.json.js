export default {
  "if": {
    "properties": {
      "FrequencyClassType": {
        "enum": [
          "Measured Characteristic"
        ]
      }
    },
    "required": [
      "FrequencyClassType"
    ]
  },
  "then": {
    "required": [
      "Bounds"
    ]
  }
}