import {
  queryCurrent,
  updateUserProfile,
  userAvatar,
  userRegister,
  forgotUserPassword,
  updateUserPassword,
  updatePassword,
  signUp,
  checkUniqueness,
  userAgentVerify,
  InvitedAgentUserVerify,
} from '@/services/user';
import { setAuthority } from '@/utils/authority';

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      console.log('response :>> ', response);
      if (response?.role) {
        setAuthority(response?.role);
      }
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    *userRegister({ payload }, { call }) {
      try {
        const res = yield call(userRegister, payload);
        return res;
      } catch (err) {
        return Promise.reject(err);
      }
    },
    *userAgentVerify({ payload }, { call }) {
      try {
        const res = yield call(userAgentVerify, payload);
        return res;
      } catch (err) {
        return Promise.reject(err);
      }
    },
    *InvitedAgentUserVerify({ payload }, { call }) {
      try {
        const res = yield call(InvitedAgentUserVerify, payload);
        return res;
      } catch (err) {
        return Promise.reject(err);
      }
    },
    *updateCurrent({ payload }, { call, put }) {
      try {
        const res = yield call(updateUserProfile, payload);
        yield put({ type: 'fetchCurrent' });
        return res;
      } catch (err) {
        return Promise.reject(err);
      }
    },
    *updatePassword({ payload }, { call, put }) {
      const res = yield call(updatePassword, payload);
      yield put({ type: 'fetchCurrent' });
      return res;
    },
    *userAvatarUpload({ payload, cb }, { call }) {
      const res = yield call(userAvatar, payload);
      if (cb) cb(res);
    },
    *userForgotPassword({ payload }, { call }) {
      const res = yield call(forgotUserPassword, payload);
      return res;
    },
    *resetUserPassword({ payload }, { call }) {
      const res = yield call(updateUserPassword, payload);
      return res;
    },
    *signUp({ payload }, { call }) {
      const res = yield call(signUp, payload);
      return res;
    },
    *checkUniqueness({ payload }, { call }) {
      try {
        const res = yield call(checkUniqueness, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
