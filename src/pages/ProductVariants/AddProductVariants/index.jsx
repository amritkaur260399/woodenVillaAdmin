import { Button, Col, Form, Input, Modal, Row, message } from 'antd';
import React, { useEffect } from 'react';
import { connect } from 'umi';

const AddProductVariants = ({
  visible,
  setVisible,
  form,
  dispatch,
  id,
  categoryId,
  getProductVariant,
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
    values.parentId = categoryId;
    console.log('id :>> ', id);
    if (visible.type === 'add') {
      dispatch({
        type: 'productVariant/addProductVariant',
        payload: {
          body: values,
        },
      }).then((res) => {
        if (res.success === true) {
          form.resetFields();
          getProductVariant();
          setVisible({ visible: false, type: 'add' });
          message.success('Product Variant  Added Sucessfully!');
        } else {
          form.resetFields();
          getProductVariant();
          setVisible({ visible: false, type: 'add' });
          message.error('Product Variant  Not Added !');
        }
      });
    } else if (visible.type === 'edit') {
      dispatch({
        type: 'productVariant/updateProductVariant',
        payload: {
          body: values,
          pathParams: { id },
        },
      }).then((res) => {
        form.resetFields();
        setVisible({ visible: false, type: 'edit' });
        getProductVariant();
        message.success('Product Variant  Updated !');
      });
    }
  };

  const handleCancelModal = () => {
    form.resetFields();
    setVisible(false);
  };

  return (
    <Modal
      title={
        <span style={{ color: '#10181e' }} className="font-medium  ">
          {visible.type === 'add' ? (
            <div className="-ml-6">Add Product Variant</div>
          ) : (
            <div>Edit Product Variant</div>
          )}
        </span>
      }
      closable={true}
      footer={null}
      visible={visible?.visible}
      onCancel={handleCancelModal}
      cancelText="as"
      okText="Submit"
      okButtonProps={{ type: 'primary', size: 'small' }}
      cancelButtonProps={{ size: 'small' }}
      okType=""
      width={340}
    >
      <Form layout="vertical" form={form} onFinish={onFinish} name="Add Category">
        <div className="">
          <div>
            <Row gutter={16}>
              <Col xs={18} sm={18} md={12} lg={12} xl={12} className="mt-2">
                <Form.Item
                  name="name"
                  label={<span className="formLabel p-0 mb-0">Name</span>}
                  rules={[
                    {
                      required: true,
                      message: 'Please enter Product Variant Name!',
                    },
                  ]}
                >
                  <Input
                    style={{ width: '270px' }}
                    size="large"
                    placeholder="Enter Product Variant Name"
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>
          <div className="flex justify-center gap-4 mt-10 ml-4">
            <Button type="primary" size="medium" htmlType="submit" onClick={() => {}}>
              Submit
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default connect(({ loading, productVariant }) => ({
  productVariantDetails: productVariant?.productVariantDetails,
  loading: loading.effects['productVariant/addProductVariant'],
}))(AddProductVariants);
