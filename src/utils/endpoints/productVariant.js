const { defaults } = require('./defaults');

export const productVariant = {
  addProductVariant: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/addProductName',
    },
  },
  addSubProductVariant: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/addProductName/:id',
    },
  },
  getProductVariant: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/addProductName',
    },
  },
  getSubProductVariant: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/addProductName/subProductData/:id',
    },
  },
  getSingleProductVariant: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/addProductName/:id',
    },
  },
  //   getSingleProduct: {
  //     v1: {
  //       ...defaults.methods.GET,
  //       ...defaults.versions.v1,
  //       uri: '/product/:id',
  //     },
  //   },
  updateProductVariant: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/addProductName/:id',
    },
  },
  deleteProductVariant: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: '/addProductName/:id',
    },
  },
};
