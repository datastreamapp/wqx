export default {
  "if": {
    "properties": {
      "CharacteristicName": {
        "enum": [
          "Ammonia",
          "Ammonia and ammonium",
          "Ammonia-nitrogen",
          "Ammonium",
          "Ammonium nitrate",
          "Inorganic nitrogen (NO2, NO3, & NH3)",
          "Inorganic nitrogen (ammonia, nitrate and nitrite)",
          "Inorganic nitrogen (nitrate and nitrite)",
          "Kjeldahl nitrogen",
          "Nitrate",
          "Nitrate + Nitrite",
          "Nitrite",
          "Nitrogen",
          "Nitrogen, mixed forms (NH3), (NH4), organic, (NO2) and (NO3)",
          "Nutrient-nitrogen",
          "Organic Nitrogen",
          "Organic phosphorus",
          "Orthophosphate",
          "Phosphate-phosphorus",
          "Phosphorus",
          "Phosphorus, Particulate Organic",
          "Phosphorus, hydrolyzable",
          "Polyphosphate",
          "Radium",
          "Soluble Reactive Phosphorus (SRP)",
          "Total Kjeldahl nitrogen",
          "Total Kjeldahl nitrogen (Organic N & NH3)",
          "Total Nitrogen, mixed forms",
          "Total Nitrogen, mixed forms (NH3), (NH4), organic, (NO2) and (NO3)",
          "Total Particulate Phosphorus",
          "Total Phosphorus, mixed forms"
        ]
      }
    },
    "required": [
      "CharacteristicName"
    ]
  },
  "then": {
    "required": [
      "MethodSpeciation"
    ]
  }
}