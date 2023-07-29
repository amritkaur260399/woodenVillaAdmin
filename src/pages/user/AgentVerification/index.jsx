import { CheckCircleTwoTone } from '@ant-design/icons';
import { notification } from 'antd';
import { useEffect } from 'react';
import { connect, history } from 'umi';

const AgentVerification = ({ dispatch }) => {
  const { token } = history.location.query;
  useEffect(() => {
    dispatch({
      type: 'user/userAgentVerify',
      payload: {
        headers: { token },
      },
    })
      .then((res) => {
        if (res?.success) {
          notification.open({
            message: 'Great Job!',
            duration: 15,
            description: 'Your account is all set to go!',
            icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
          });
          history.replace('/user/login');
        } else {
          notification.error({
            message: 'Invalid request',
            duration: 10,
            description: `Something went wrong`,
          });
          history.replace('/user/login');
        }
      })
      .catch((err) => {
        if (err) {
          notification.error({
            message: 'This token is invalid',
            duration: 10,
            description: `Something went wrong`,
          });
          history.replace('/user/login');
        }
      });
  }, []);

  return '';
};

export default connect()(AgentVerification);
