import React, { useEffect } from 'react';
import { Input, Select, Form } from 'antd';
import styles from './styles.less';
import { connect } from 'umi';

const { Option } = Select;
const PhoneNumber = (props) => {
  const {
    name,
    rules,
    countryCode,
    placeholder,
    dispatch,
    countryCodes,
    initialNumber,
    initialCountry,
  } = props;

  useEffect(() => {
    dispatch({
      type: 'school/getCountryCode',
      payload: {},
    });
  }, []);

  // added the event listener to stop incrementing number field on mouse scroll event,
  // removed that event listener when component is unmounted
  useEffect(() => {
    // eslint-disable-next-line func-names
    const eventListener = document.addEventListener('wheel', function () {
      if (
        document.activeElement.type === 'number' &&
        document.activeElement.classList.contains('noscroll')
      ) {
        document.activeElement.blur();
      }
    });
    return () => {
      document.removeEventListener('wheel', eventListener);
    };
  }, []);

  return (
    <Input.Group compact className={styles.container}>
      <Form.Item initialValue={initialCountry || '+1'} name={countryCode} noStyle>
        <Select
          size="large"
          style={{ width: '25%' }}
          showSearch
          optionFilterProp={'filter'}
          filterOption
        >
          {countryCodes?.data?.map((item) => (
            <Option filter={item?.name} key={item?._id} value={item?.dialCode}>
              {item?.dialCode}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name={name}
        initialValue={initialNumber}
        rules={[
          ...rules,
          () => ({
            validator(_, value) {
              if (value?.length < 10) {
                return Promise.reject(value && new Error('please enter the atleast 10 digits'));
              }
              if (value?.length > 15) {
                return Promise.reject(value && new Error("You can't add more than 15 digits"));
              }
              return Promise.resolve();
            },
          }),
        ]}
        noStyle
      >
        <Input
          type="number"
          style={{ width: '75%' }}
          size="large"
          {...props}
          maxLength={10}
          placeholder={placeholder}
          className="noscroll"
        />
      </Form.Item>
    </Input.Group>
  );
};

export default connect(({ school }) => ({ countryCodes: school?.countryCodes }))(PhoneNumber);
