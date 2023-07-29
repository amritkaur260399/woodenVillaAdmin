import { callApi } from '@/utils/apiUtils';
import { productVariant } from '@/utils/endpoints/productVariant';

export const addProductVariant = ({ body, query }) =>
  callApi({ uriEndPoint: productVariant.addProductVariant.v1, body, query })
    .then((res) => res)
    .catch((err) => err);
export const addSubProductVariant = ({ body, pathParams }) =>
  callApi({ uriEndPoint: productVariant.addSubProductVariant.v1, body, pathParams })
    .then((res) => res)
    .catch((err) => err);
export const getProductVariant = ({ query }) =>
  callApi({ uriEndPoint: productVariant.getProductVariant.v1, query })
    .then((res) => res)
    .catch((err) => err);
export const getSubProductVariant = ({ pathParams, query }) =>
  callApi({ uriEndPoint: productVariant.getSubProductVariant.v1, pathParams, query })
    .then((res) => res)
    .catch((err) => err);
export const getSingleProductVariant = ({ pathParams }) =>
  callApi({ uriEndPoint: productVariant.getSingleProductVariant.v1, pathParams })
    .then((res) => res)
    .catch((err) => err);

export const updateProductVariant = ({ body, pathParams }) =>
  callApi({ uriEndPoint: productVariant.updateProductVariant.v1, body, pathParams })
    .then((res) => res)
    .catch((err) => err);
export const deleteProductVariant = ({ pathParams }) =>
  callApi({ uriEndPoint: productVariant.deleteProductVariant.v1, pathParams })
    .then((res) => res)
    .catch((err) => err);
