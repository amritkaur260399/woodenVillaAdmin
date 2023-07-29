/* eslint-disable prefer-promise-reject-errors */
import React from 'react';
import { Col, Form, Input, message, notification, Row } from 'antd';
import { CheckCircleTwoTone, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Link, connect, history } from 'umi';

import styles from '../index.less';
import UserAuthLayout from '../UserAuthLayout';
import PhoneNumber from '@/components/PhoneNumber';
import JWT from 'jwt-decode';
import { checkUniqueness } from '@/services/user';

const SignUp = ({
  dispatch,
  location: {
    query: { token },
  },
}) => {
  const [form] = Form.useForm();

  const decodedToken = token && JWT(token);

  const onFinish = (values) => {
    const body = { ...values };
    delete body.phone;
    delete body.countryCode;
    delete body.confirmNewPassword;
    body.phoneNumber = {
      number: values?.phone,
      countryCode: values?.countryCode,
    };
    if (decodedToken?.email) {
      return dispatch({
        type: 'user/InvitedAgentUserVerify',
        payload: {
          body,
          headers: {
            token,
          },
        },
      })
        .then((res) => {
          if (res?.success) {
            history.replace('/user/login');
            notification.open({
              message: 'Great job!',
              duration: 15,
              description: 'Check Your mail to confirm your account!',
              icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
            });
          } else {
            history.replace('/user/login');
            message.error('Something went wrong to creating your account');
            message?.error(res?.message);
          }
        })
        .catch((err) => {
          if (err) {
            message?.error(err?.message);
            history.replace('/user/login');
            message.error('Something went wrong to creating your account');
          }
        });
    }

    return dispatch({
      type: 'user/userRegister',
      payload: {
        body,
      },
    })
      .then((res) => {
        if (res?.success) {
          history.replace('/user/login');
          notification.open({
            message: 'Great job!',
            duration: 15,
            description: 'Your account is all set to go!',
            icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
          });
        }
      })
      .catch((err) => {
        if (err) {
          message?.error(err?.message);
          history.replace('/user/login');
          message.error('Something went wrong to register');
        }
      });
  };
  console.log('decodedToken', decodedToken);
  return (
    <UserAuthLayout>
      <div className="mt-20 mx-10">
        <div className="">
          <p className={styles.DescriptionText} style={{ color: '#612c13' }}>
            Create an account
          </p>
          <p className="text-[#612c13] text-base text-center">
            Already have an account?{' '}
            <Link to="/user/login" className={styles.LoginLink} style={{ color: '#612c13' }}>
              Login
            </Link>
          </p>
        </div>
        <div className="">
          <Form
            form={form}
            colon={false}
            layout="vertical"
            hideRequiredMark
            onFinish={onFinish}
            className={styles.SignUpForm}
          >
            <Row gutter={12}>
              <Col span={12}>
                <Form.Item
                  name="firstName"
                  initialValue={decodedToken?.firstName}
                  label={<span className="formLabel">First name</span>}
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your first name!',
                    },
                  ]}
                >
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="lastName"
                  initialValue={decodedToken?.lastName}
                  label={<span className="formLabel">Last name</span>}
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your last name!',
                    },
                  ]}
                >
                  <Input size="large" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col span={12}>
                {decodedToken?.email ? (
                  <Form.Item
                    name="email"
                    initialValue={decodedToken?.email}
                    label={<span className="formLabel">Email address</span>}
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your email address!',
                      },
                      {
                        type: 'email',
                        message: 'Please enter valid email address!',
                      },
                    ]}
                  >
                    <Input size="large" disabled />
                  </Form.Item>
                ) : (
                  <Form.Item
                    label={<span className="formLabel">Email</span>}
                    name="email"
                    initialValue=""
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "Email can't be blank!",
                      },
                      {
                        message: 'Please enter a valid email address!',
                        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      type="email"
                      name="agent-email"
                      id="agent-email"
                      onChange={() => {
                        form
                          .validateFields(['email'])
                          .then(({ email }) => {
                            checkUniqueness({ pathParams: { email: email.toLowerCase() } }).then(
                              ({ isUnique }) => {
                                if (!isUnique) {
                                  form.setFields([
                                    {
                                      name: 'email',
                                      errors: ['This email already exist'],
                                    },
                                  ]);
                                }
                              },
                            );
                          })
                          .catch(() => {});
                      }}
                    />
                  </Form.Item>
                )}
              </Col>
              <Col span={12}>
                {/* <Form.Item
                  required
                  label={<span className="FormLabel font-medium">Phone Number</span>}
                >
                  <PhoneNumber
                    countryCode="countryCode"
                    initialNumber={decodedToken?.number}
                    initialCountry={decodedToken?.countryCode}
                    rules={[
                      {
                        required: true,
                        message: 'Please enter the contact number of service user',
                      },
                    ]}
                    form={form}
                    name="phone"
                  />
                </Form.Item> */}
              </Col>
            </Row>
            {/*   <Form.Item
              name={['address', 'address1']}
              label={<span className={'formLabel'}>Street address</span>}
              rules={[
                {
                  required: true,
                  message: 'Please select your street address!',
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>
            <Row gutter={12}>
              <Col span={12}>
                <Form.Item
                  name={['address', 'city']}
                  label={<span className={'formLabel'}>City</span>}
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your city!',
                    },
                  ]}
                >
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name={['address', 'state']}
                  label={<span className="formLabel">Province</span>}
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your province!',
                    },
                  ]}
                >
                  <Input size="large" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col span={12}>
                <Form.Item
                  name={['address', 'zipCode']}
                  label={<span className="formLabel">Postal Code</span>}
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your postal code!',
                    },
                  ]}
                >
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name={['address', 'country']}
                  label={<span className={'formLabel'}>Country</span>}
                  rules={[
                    {
                      required: true,
                      message: 'Please select your country!',
                    },
                  ]}
                >
                  <Input size="large" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col span={12}>
                <Form.Item
                  name={'companyName'}
                  label={<span className="formLabel">Company name</span>}
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your company name!',
                    },
                  ]}
                >
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name={'website'}
                  label={<span className={'formLabel'}>Website (Optional)</span>}
                >
                  <Input size="large" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              name={'social'}
              label={<span className={'formLabel'}>Facebook/Instagram (Optional)</span>}
            >
              <Input size="large" />
            </Form.Item>{' '}
            <div>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please enter your password!' }]}
                label={<span className="formLabel">Password</span>}
              >
                <Input.Password
                  size="large"
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </Form.Item>
              <Form.Item
                name="confirmNewPassword"
                label={<span className="formLabel">Confirm New Password</span>}
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your new password!',
                  },
                  () => ({
                    validator(_, value) {
                      if (value?.length === 0 || form?.getFieldValue('password') === value)
                        return Promise.resolve();
                      // eslint-disable-next-line prefer-promise-reject-errors
                      return Promise.reject(
                        value && 'Confirm password does not matches the new password!',
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  placeholder="Confirm new password"
                  size="large"
                  iconRender={(open) => (open ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </Form.Item> */}
            {/* </div> */}
            <button
              type="submit"
              style={{ backgroundColor: '#612c13' }}
              className={styles.LoginButton}
            >
              Create an account
            </button>
          </Form>
        </div>
      </div>
    </UserAuthLayout>
  );
};

export default connect(({ common }) => ({
  stateCodes: common.stateCodes,
}))(SignUp);
