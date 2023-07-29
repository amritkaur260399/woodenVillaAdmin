import { callApi } from '@/utils/apiUtils';
import { product } from '@/utils/endpoints/product';

export const addProduct = ({ body, query }) =>
  callApi({ uriEndPoint: product.addProduct.v1, body, query })
    .then((res) => res)
    .catch((err) => err);
export const getAllProducts = ({ query }) =>
  callApi({ uriEndPoint: product.getAllProducts.v1, query })
    .then((res) => res)
    .catch((err) => err);
export const getSingleProduct = ({ pathParams }) =>
  callApi({ uriEndPoint: product.getSingleProduct.v1, pathParams })
    .then((res) => res)
    .catch((err) => err);

export const updateProduct = ({ body, pathParams }) =>
  callApi({ uriEndPoint: product.updateProduct.v1, body, pathParams })
    .then((res) => res)
    .catch((err) => err);
export const deleteProduct = ({ pathParams }) =>
  callApi({ uriEndPoint: product.deleteProduct.v1, pathParams })
    .then((res) => res)
    .catch((err) => err);
export const deleteProductImage = ({ pathParams }) =>
  callApi({ uriEndPoint: product.deleteProductImage.v1, pathParams })
    .then((res) => res)
    .catch((err) => err);
export const updateProductStatus = ({ pathParams, body }) =>
  callApi({ uriEndPoint: product.updateProductStatus.v1, pathParams, body })
    .then((res) => res)
    .catch((err) => err);
export const getStats = ({ query }) =>
  callApi({ uriEndPoint: product.getStats.v1, query })
    .then((res) => res)
    .catch((err) => err);
