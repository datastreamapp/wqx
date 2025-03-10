export default {
  if: {
    type: 'object',
    unevaluatedProperties: false,
    properties: {
      ActivityType: {
        enum: [
          'Quality Control Alternative Measurement Sensitivity',
          'Quality Control Alternative Measurement Sensitivity Plus',
          'Quality Control Sample-Blind Duplicate',
          'Quality Control Sample-Equipment Blank',
          'Quality Control Sample-Field Ambient Conditions Blank',
          'Quality Control Sample-Field Blank',
          'Quality Control Sample-Field Replicate',
          'Quality Control Sample-Field Spike',
          'Quality Control Sample-Field Surrogate Spike',
          'Quality Control Sample-Inter-lab Split',
          'Quality Control Sample-Lab Blank',
          'Quality Control Sample-Lab Control Standard',
          'Quality Control Sample-Lab Control Standard Duplicate',
          'Quality Control Sample-Lab Duplicate',
          'Quality Control Sample-Lab Duplicate 2',
          'Quality Control Sample-Lab Matrix Spike',
          'Quality Control Sample-Lab Re-Analysis',
          'Quality Control Sample-Lab Spike',
          'Quality Control Sample-Lab Spike Duplicate',
          'Quality Control Sample-Lab Spike Target',
          'Quality Control Sample-Lab Split',
          'Quality Control Sample-Lab Surrogate Control Standard',
          'Quality Control Sample-Lab Surrogate Control Standard Duplicate',
          'Quality Control Sample-Lab Surrogate Method Blank',
          'Quality Control Sample-Measurement Precision Sample',
          'Quality Control Sample-Other',
          'Quality Control Sample-Post-preservative Blank',
          'Quality Control Sample-Pre-preservative Blank',
          'Quality Control Sample-Reagent Blank',
          'Quality Control Sample-Reference Sample',
          'Quality Control Sample-Trip Blank',
          'Quality Control-Negative Control',
          'Sample-Composite With Parents',
          'Sample-Composite Without Parents',
          'Sample-Field Split',
          'Sample-Field Subsample',
          'Sample-Integrated Cross-Sectional Profile',
          'Sample-Integrated Flow Proportioned',
          'Sample-Integrated Horizontal Profile',
          'Sample-Integrated Horizontal and Vertical Composite Profile',
          'Sample-Integrated Time Series',
          'Sample-Integrated Vertical Profile',
          'Sample-Negative Control',
          'Sample-Other',
          'Sample-Positive Control',
          'Sample-Routine',
          'Sample-Routine Resample'
        ]
      }
    },
    required: ['ActivityType']
  },
  then: {
    type: 'object',
    unevaluatedProperties: false,
    properties: {
      ResultAnalyticalMethodID: true,
      ResultAnalyticalMethodContext: true
    },
    required: ['ResultAnalyticalMethodID', 'ResultAnalyticalMethodContext']
  }
}
