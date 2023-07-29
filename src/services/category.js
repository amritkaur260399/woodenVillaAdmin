import { callApi } from '@/utils/apiUtils';
import { category } from '@/utils/endpoints/category';

export const addCategory = ({ body, query }) =>
  callApi({ uriEndPoint: category.addCategory.v1, body, query })
    .then((res) => res)
    .catch((err) => err);
export const addSubCategory = ({ body, pathParams }) =>
  callApi({ uriEndPoint: category.addSubCategory.v1, body, pathParams })
    .then((res) => res)
    .catch((err) => err);
export const getAllCategory = ({ query }) =>
  callApi({ uriEndPoint: category.getAllCategory.v1, query })
    .then((res) => res)
    .catch((err) => err);
export const getSingleCategory = ({ pathParams }) =>
  callApi({ uriEndPoint: category.getSingleCategory.v1, pathParams })
    .then((res) => res)
    .catch((err) => err);
export const getAllSubCategory = ({ pathParams, query }) =>
  callApi({ uriEndPoint: category.getAllSubCategory.v1, pathParams, query });

export const updateCategory = ({ body, pathParams }) =>
  callApi({ uriEndPoint: category.updateCategory.v1, body, pathParams })
    .then((res) => res)
    .catch((err) => err);
export const deleteCategory = ({ pathParams }) =>
  callApi({ uriEndPoint: category.deleteCategory.v1, pathParams })
    .then((res) => res)
    .catch((err) => err);
export const deleteSubCategory = ({ pathParams }) =>
  callApi({ uriEndPoint: category.deleteSubCategory.v1, pathParams })
    .then((res) => res)
    .catch((err) => err);
