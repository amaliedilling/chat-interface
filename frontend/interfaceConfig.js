// Define the core chatConfig object
const chatConfig = {
  evaluationRequired: true, // Can toggle whether evaluations are mandatory
  evaluationModes: [ // Define the evaluation criteria. The description is for the tooltips for the user.
    { name: 'Factuality', type: 'scale', description: 'Evaluate how factual or accurate the response is.' },
    { name: 'Actionability', type: 'scale', description: 'Assess if the response can be acted upon or is actionable.' },
    { name: 'Appropriateness', type: 'thumbs', description: 'Judge whether the response is appropriate in context.' },
  ],

  header: {
    title: 'AAU Concierge',
    subtitle: 'Experimental Trial',
  },
};

// Add the footer after the rest of the config is defined
chatConfig.footer = {
  text: `Note that while the ${chatConfig.header.title} has been developed to the highest standards, there may be instances where its accuracy can vary.`,
};

export default chatConfig;
