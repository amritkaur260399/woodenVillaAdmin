import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Modal, Row, Upload, message } from 'antd';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { connect } from 'umi';

const AddProductSubVariant = ({
  visible,
  setVisible,
  form,
  dispatch,
  editId,
  id,
  categoryDetails,
  getSubProductVariant,
  productVariantDetails,
}) => {
  useEffect(() => {
    if (productVariantDetails?.data?._id) {
      // console.log('first', editId);

      form.setFieldsValue({
        name: productVariantDetails?.data?.name,
      });
    }
  }, [productVariantDetails?.data?._id]);
  const onFinish = (values) => {
    if (visible.type === 'add') {
      //   const formData = new FormData();
      //   formData.append('name', values?.name);

      //   image?.map((i) => {
      //     formData.append('image', i);
      //   });
      dispatch({
        type: 'productVariant/addSubProductVariant',

        payload: {
          body: values,
          pathParams: { id },
        },
      }).then((res) => {
        if (res.success === true) {
          form.resetFields();
          setVisible({ visible: false, type: 'add' });
          getSubProductVariant();
          message.success('Sub Product Variant Added Sucessfully!');
        } else {
          form.resetFields();
          setVisible({ visible: false, type: 'add' });
          getSubProductVariant();
          message.error('Sub Product Variant Not Added !');
        }
      });
    } else if (visible.type === 'edit') {
      dispatch({
        type: 'productVariant/updateProductVariant',
        payload: {
          body: values,
          pathParams: { id: editId },
        },
      }).then((res) => {
        if (res.success === true) {
          form.resetFields();
          setVisible({ visible: false, type: 'edit' });
          getSubProductVariant();
          message.success('Sub Product Variant Updated Sucessfully!');
        } else {
          form.resetFields();
          setVisible({ visible: false, type: 'edit' });
          getSubProductVariant();
          message.error('Sub Product Variant Not  Updated !');
        }
      });
    }
  };

  const handleCancelModal = () => {
    form.resetFields();
    setVisible({ visible: false, type: 'add' });
  };

  return (
    <Modal
      title={
        <span style={{ color: '#10181e' }} className="font-medium">
          {visible.type === 'add' ? (
            <div>Add SubProductVariant</div>
          ) : (
            <div>Edit SubProductVariant</div>
          )}
        </span>
      }
      closable={true}
      footer={null}
      width={400}
      visible={visible?.visible}
      onCancel={handleCancelModal}
      okText="Submit"
      okButtonProps={{ type: 'primary', size: 'large' }}
      cancelButtonProps={{ size: 'large' }}
      okType=""
      //   className="border border-red-500"
    >
      <Form layout="vertical" form={form} onFinish={onFinish} name="Add Category">
        <Row gutter={16}>
          <Col xs={18} sm={18} md={12} lg={12} xl={12} className="m-4">
            <Form.Item
              name="name"
              label={<span className="formLabel p-0 mb-0">Name</span>}
              rules={[
                {
                  required: true,
                  message: 'Please enter Sub Product Variant Name!',
                },
              ]}
            >
              <Input
                style={{ width: '330px' }}
                size="large"
                placeholder="Enter Sub Product Variant Name"
              />
            </Form.Item>
          </Col>
        </Row>
        <div className="flex justify-end gap-4 mt-4">
          <Button type="primary" size="large" htmlType="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default connect(({ loading, productVariant }) => ({
  productVariantDetails: productVariant?.productVariantDetails,
  loading: loading.effects['productVariant/addSubProductVariant'],
}))(AddProductSubVariant);
