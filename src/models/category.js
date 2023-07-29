import {
  addCategory,
  addSubCategory,
  deleteCategory,
  deleteSubCategory,
  getAllCategory,
  getAllSubCategory,
  updateCategory,
  getSingleCategory,
} from '@/services/category';

const Model = {
  namespace: 'category',
  state: {
    categoryList: null,
    subCategoryList: null,
    categoryDetails: null,
  },
  effects: {
    *addCategory({ payload }, { call }) {
      try {
        const res = yield call(addCategory, payload);
        // yield put({
        //   type: 'setStates',
        //   payload: res,
        //   key: 'stateCodes',
        // });
        return res;
      } catch (error) {
        Promise.reject(error);
        // message.error(error?.data?.message);
      }
    },
    *addSubCategory({ payload }, { call }) {
      const res = yield call(addSubCategory, payload);

      // yield put({
      //   type: 'setStates',
      //   payload: res,
      //   key: 'stateCodes',
      // });
      return res;
    },
    *getAllCategory({ payload }, { call, put }) {
      const res = yield call(getAllCategory, payload);

      yield put({
        type: 'setStates',
        payload: res,
        key: 'categoryList',
      });
      return res;
    },
    *getSingleCategory({ payload }, { call, put }) {
      const res = yield call(getSingleCategory, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'categoryDetails',
      });
      return res;
    },
    *getAllSubCategory({ payload }, { call, put }) {
      const res = yield call(getAllSubCategory, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'subCategoryList',
      });
      return res;
    },

    *updateCategory({ payload }, { call }) {
      const res = yield call(updateCategory, payload);

      return res;
    },
    *deleteCategory({ payload }, { call }) {
      const res = yield call(deleteCategory, payload);

      return res;
    },
    *deleteSubCategory({ payload }, { call }) {
      const res = yield call(deleteSubCategory, payload);
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
