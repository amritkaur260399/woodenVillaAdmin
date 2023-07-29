import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Modal, Row, Upload, message } from 'antd';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { connect } from 'umi';
import styles from './index.less';

const AddSubCategory = ({
  visible,
  setVisible,
  form,
  dispatch,
  subeditId,
  categoryId,
  categoryDetails,
  getAllSubCategory,
  setSubEditId,
  record,
  setRecord,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [image, setImage] = useState([]);

  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);

  const [loading, setLoading] = useState(false);

  // console.log(categoryDetails?.data?.media?.[0]?.url, '(categoryDetails?.data?.image');
  console.log(subeditId, 'subeditId');
  console.log(record, 'record');
  useEffect(() => {
    if (record?._id) {
      setImage(record?.media || []);
      form.setFieldsValue({
        name: record.name,
      });
    }
    // return () => {
    //   setSubEditId();
    //   setRecord();
    // };
  }, [record?._id]);

  const onFinish = (values) => {
    if (image.length > 0) {
      setLoading(true);
      if (visible.type === 'add') {
        const formData = new FormData();
        formData.append('name', values?.name);

        image?.map((i) => {
          formData.append('image', i);
        });
        dispatch({
          type: 'category/addSubCategory',

          payload: {
            body: formData,
            pathParams: { categoryId },
          },
        })
          .then((res) => {
            setImage([]);
            form.resetFields();
            setSubEditId();
            setRecord();

            setLoading(false);
            getAllSubCategory();
            setVisible({ visible: false, type: 'add' });

            if (res.success === true) {
              message.success('Sub Category Added Sucessfully!');
            } else {
              message.error(res?.data?.error?.message);
            }
            // console.log('res',);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      } else if (visible.type === 'edit') {
        const formData = new FormData();
        formData.append('name', values?.name);

        image?.map((i) => {
          formData.append('image', i);
        });
        dispatch({
          type: 'category/updateCategory',
          payload: {
            body: formData,
            pathParams: { id: subeditId },
          },
        })
          .then((res) => {
            setImage([]);
            form.resetFields();
            setSubEditId();
            setRecord();
            setLoading(false);
            setVisible({ visible: false, type: 'edit' });
            getAllSubCategory();

            if (res.success == true) {
              message.success('SubCategory Updated Sucessfully!');
            } else {
              message.error('SubCategory Not Updated ');
            }
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }
    } else {
      message.error('image is required');
    }
  };

  const handleCancelModal = () => {
    form.resetFields();
    setImage([]);
    setSubEditId();
    setRecord();
    setVisible({ visible: false, type: 'add' });
    // setTimeout(function () {
    //   window.location.reload(); // Reload the page after 1 second
    // }, 100);
  };

  function updateImage(file) {
    file.url = URL.createObjectURL(file);
    console.log('file.url', file.url);
    // setImage((prev) => [...prev, file])
  }

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      // file.preview = await getBase64(file.originFileObj);
      console.log('URL.createObjectURL(file);', URL.createObjectURL(file));
    }
    console.log(file.url, 'preview');
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  // const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  console.log('image', previewOpen);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  return (
    <Modal
      title={
        <span style={{ color: '#10181e' }} className="font-medium">
          {visible.type === 'add' ? (
            <div className=" -ml-6">Add SubCategory</div>
          ) : (
            <div className=" -ml-6">Edit SubCategory</div>
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
          <Col xs={18} sm={18} md={12} lg={12} xl={12} className="mt-4 ">
            <Form.Item
              name="name"
              label={<span className="formLabel p-0 mb-0">Name</span>}
              rules={[
                {
                  required: true,
                  message: 'Please enter Sub Category Name!',
                },
              ]}
            >
              <Input style={{ width: '330px' }} size="large" placeholder="Enter SubCategory Name" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} className="">
            <Form.Item
              name="image"
              label={<span className="formLabel p-0 mb-0">Images</span>}
              // rules={[{ required: true, message: '${label} is required' }]}
            >
              <Upload
                listType="picture-card"
                fileList={[...image]}
                // fileList={
                //   !loading
                //     ? image?.map((img, idx) => ({ url: img, status: 'done', uid: idx }))
                //     : [...image?.map((img, idx) => ({ url: img, status: 'done', uid: idx }))]
                // }
                onPreview={handlePreview}
                onRemove={(file) => {
                  const { confirm } = Modal;
                  return new Promise((resolve) => {
                    confirm({
                      title: 'Are you sure you want to Delete  Image?',
                      width: 300,
                      className: `${styles.customModalStyle}`,
                      onOk: () => {
                        resolve(true);

                        setImage((prev) => prev.filter((item) => item._id !== file._id));
                      },
                    });
                  });
                }}
                // onChange={handleChange}

                beforeUpload={(file) => {
                  const allowedFileTypes = ['image/jpeg', 'image/png', 'image/jpg']; // Add more file types if needed
                  const isFileTypeAllowed = allowedFileTypes.includes(file.type);
                  if (!isFileTypeAllowed) {
                    message.error('Only JPEG/PNG images are allowed');
                  } else {
                    file.url = URL.createObjectURL(file);
                    setImage((prev) => [...prev, file]);
                  }
                  return false;
                }}
              >
                {image.length >= 1 ? null : uploadButton}
              </Upload>
              <Modal
                visible={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
              >
                <img
                  alt="example"
                  style={{
                    width: '100%',
                  }}
                  src={previewImage}
                />
              </Modal>
            </Form.Item>
          </Col>
        </Row>
        <div className="flex justify-center gap-4   ">
          <Button type="primary" size="large" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default connect(({ loading, category }) => ({
  categoryDetails: category?.categoryDetails,
  loading: loading.effects['category/addSubCategory'],
}))(AddSubCategory);
