import {
  addProductVariant,
  getProductVariant,
  updateProductVariant,
  deleteProductVariant,
  getSingleProductVariant,
  addSubProductVariant,
  getSubProductVariant,
} from '@/services/productVariant';

const Model = {
  namespace: 'productVariant',
  state: {
    productVariantList: null,
    productVariantDetails: null,
    subProductVariantList: null,
  },
  effects: {
    *addProductVariant({ payload }, { call }) {
      const res = yield call(addProductVariant, payload);
      // yield put({
      //   type: 'setStates',
      //   payload: res,
      //   key: 'stateCodes',
      // });
      return res;
    },
    *addSubProductVariant({ payload }, { call }) {
      const res = yield call(addSubProductVariant, payload);
      // yield put({
      //   type: 'setStates',
      //   payload: res,
      //   key: 'stateCodes',
      // });
      return res;
    },
    *getProductVariant({ payload }, { call, put }) {
      const res = yield call(getProductVariant, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'productVariantList',
      });
      return res;
    },
    *getSubProductVariant({ payload }, { call, put }) {
      const res = yield call(getSubProductVariant, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'subProductVariantList',
      });
      return res;
    },
    *getSingleProductVariant({ payload }, { call, put }) {
      const res = yield call(getSingleProductVariant, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'productVariantDetails',
      });
      return res;
    },

    *updateProductVariant({ payload }, { call }) {
      const res = yield call(updateProductVariant, payload);

      return res;
    },
    *deleteProductVariant({ payload }, { call }) {
      const res = yield call(deleteProductVariant, payload);

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
