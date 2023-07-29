const { defaults } = require('./defaults');

export const feedback = {
  getAllFeedback: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/feedback',
    },
  },
  addResponse: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '',
    },
  },
};
