import { getAllUsers, getSingleUser } from '@/services/users';

const Model = {
  namespace: 'users',
  state: {
    usersList: null,
    singleUser: null,
  },
  effects: {
    *getAllUsers({ payload }, { call, put }) {
      const res = yield call(getAllUsers, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'usersList',
      });
      return res;
    },
    *getSingleUser({ payload }, { call, put }) {
      const res = yield call(getSingleUser, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'singleUser',
      });
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
