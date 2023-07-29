// import feedback from '@/pages/feedback';
import { callApi } from '@/utils/apiUtils';
import { feedback } from '@/utils/endpoints/feedback';

export const getAllFeedback = () => callApi({ uriEndPoint: feedback.getAllFeedback.v1 });
export const addResponse = ({ body }) => callApi({ uriEndPoint: feedback.addResponse.v1, body });
