// Define the core chatConfig object
const chatConfig = {
  evaluationRequired: true, // Can toggle whether evaluations are mandatory
  evaluationModes: [
    { name: 'Factuality', type: 'scale' },
    { name: 'Actionability', type: 'scale' },
    { name: 'Appropriateness', type: 'thumbs' },
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
