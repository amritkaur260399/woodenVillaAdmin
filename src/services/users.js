import { users } from '@/utils/endpoints/users';
import { callApi } from '@/utils/apiUtils';

export const getAllUsers = ({ query }) => callApi({ uriEndPoint: users.getAllUsers.v1, query });

export const getSingleUser = ({ pathParams }) =>
  callApi({ uriEndPoint: users.getSingleUser.v1, pathParams });
