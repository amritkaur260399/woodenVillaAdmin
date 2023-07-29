import { addResponse, getAllContacts } from '@/services/contact';

const Model = {
  namespace: 'contact',
  state: {
    contactList: null,
  },
  effects: {
    *getAllContacts({ payload }, { call, put }) {
      try {
        const res = yield call(getAllContacts, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'contactList',
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
