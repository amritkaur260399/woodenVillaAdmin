const { defaults } = require('./defaults');

export const category = {
  addCategory: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/category',
    },
  },
  addSubCategory: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/category/:categoryId',
    },
  },
  getAllCategory: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/category',
    },
  },
  getSingleCategory: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/category/getSingleCategoryDetails/:id',
    },
  },
  getAllSubCategory: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/category/:categoryId',
    },
  },

  updateCategory: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/category/:id',
    },
  },
  deleteCategory: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: '/category/:id',
    },
  },
  deleteSubCategory: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: '/category/subCategory/:subCategoryId',
    },
  },
};
