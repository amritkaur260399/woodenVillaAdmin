import { addResponse, getAllFeedback } from '@/services/feedback';

const Model = {
  namespace: 'feedback',
  state: {
    feedbackList: null,
  },
  effects: {
    *getAllFeedback({ payload }, { call, put }) {
      try {
        const res = yield call(getAllFeedback, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'feedbackList',
        });
        return res;
      } catch (error) {
        Promise.reject(error);
      }
    },
    *addResponse({ payload }, { call }) {
      try {
        const res = yield call(addResponse, payload);
        return res;
      } catch (error) {
        Promise.reject(error);
      }
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
