import {
  addProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
  getSingleProduct,
  deleteProductImage,
  updateProductStatus,
  getStats,
} from '@/services/product';

const Model = {
  namespace: 'product',
  state: {
    productList: null,
    productDetails: null,
    stats: null,
  },
  effects: {
    *addProduct({ payload }, { call }) {
      const res = yield call(addProduct, payload);
      // yield put({
      //   type: 'setStates',
      //   payload: res,
      //   key: 'stateCodes',
      // });
      return res;
    },
    *getAllProducts({ payload }, { call, put }) {
      const res = yield call(getAllProducts, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'productList',
      });
      return res;
    },
    *getStats({ payload }, { call, put }) {
      const res = yield call(getStats, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'stats',
      });
      return res;
    },
    *getSingleProduct({ payload }, { call, put }) {
      const res = yield call(getSingleProduct, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'productDetails',
      });
      return res;
    },

    *updateProduct({ payload }, { call }) {
      const res = yield call(updateProduct, payload);

      return res;
    },
    *deleteProduct({ payload }, { call }) {
      const res = yield call(deleteProduct, payload);

      return res;
    },
    *deleteProductImage({ payload }, { call }) {
      const res = yield call(deleteProductImage, payload);

      return res;
    },
    *updateProductStatus({ payload }, { call }) {
      const res = yield call(updateProductStatus, payload);

      return res;
    },
  },
  reducers: {
    setStates(state, { payload, key }) {
      return {
        ...state,
        [key]: payload,
      };
    },
  },
};
export default Model;
