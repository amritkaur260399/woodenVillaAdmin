const { defaults } = require('./defaults');

export const product = {
  addProduct: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/product',
    },
  },
  getAllProducts: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/product',
    },
  },
  getSingleProduct: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/product/:id',
    },
  },
  updateProduct: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/product/:id',
    },
  },
  deleteProduct: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: '/product/:id',
    },
  },
  deleteProductImage: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: '/product/:productId/:imageId',
    },
  },
  updateProductStatus: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/product/:id/status',
    },
  },
  getStats: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/product/stats/count',
    },
  },
};
