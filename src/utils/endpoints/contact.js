const { defaults } = require('./defaults');

export const contact = {
  getAllContacts: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/contact',
    },
  },
  addResponse: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/response/',
    },
  },
};
