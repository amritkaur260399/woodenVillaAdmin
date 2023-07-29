const { defaults } = require('./defaults');

export const users = {
  getAllUsers: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/user',
    },
  },
  getSingleUser: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/user/:id',
    },
  },
};
