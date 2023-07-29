// import feedback from '@/pages/feedback';
import { callApi } from '@/utils/apiUtils';
import { contact } from '@/utils/endpoints/contact';

export const getAllContacts = ({ query }) =>
  callApi({ uriEndPoint: contact.getAllContacts.v1, query });
export const addResponse = ({ body }) => callApi({ uriEndPoint: contact.addResponse.v1, body });
