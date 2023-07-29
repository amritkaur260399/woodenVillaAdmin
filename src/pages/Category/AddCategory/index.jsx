import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Modal, Row, Upload, message } from 'antd';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { connect } from 'umi';
import styles from './index.less';

const AddCategory = ({
  visible,
  setVisible,
  form,
  dispatch,
  editId,

  categoryId,
  categoryDetails,
  getAllCategory,
  setEditId,
  record,
  setRecord,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [image, setImage] = useState([]);

  const [previewTitle, setPreviewTitle] = useState('');
  // const [fileList, setFileList] = useState([]);
  // const [id, setId] = useState('');
  // const [subCategoryId, setSubCategoryId] = useState('');
  const [loading, setLoading] = useState(false);
  // const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (record?._id) {
      setImage(record?.media);
      form.setFieldsValue({
        name: record?.name,
      });
    }
  }, [record?._id]);

  const onFinish = (values) => {
    if (image.length > 0) {
      values.parentId = categoryId;
      setLoading(true);
      if (visible.type === 'add') {
        const formData = new FormData();
        formData.append('name', values?.name);

        image?.map((i) => {
          formData.append('image', i);
        });
        dispatch({
          type: 'category/addCategory',
          payload: {
            body: formData,
          },
        })
          .then((res) => {
            setImage([]);
            form.resetFields('');
            getAllCategory();
            setLoading(false);
            setVisible({ visible: false, type: 'add' });
            setRecord();
            setEditId();

            if (res.success === true) {
              message.success('Category Added Sucessfully!');
            } else {
              message.error(res?.data?.error?.message);
            }
            // console.log('res',);
          })
          .catch((err) => {
            console.log('err', err);
            return Promise.reject(err);
          });
      } else if (visible.type === 'edit') {
        const formData = new FormData();
        formData.append('name', values?.name);
        // image?.map((i) => {
        //   if (!!i?._id === false) formData.append('image', i);
        // });

        image?.map((i) => {
          if (!!i?._id === false) formData.append('image', i);
        });
        dispatch({
          type: 'category/updateCategory',
          payload: {
            body: formData,
            pathParams: { id: editId },
          },
        }).then((res) => {
          form.resetFields();
          setImage([]);
          setEditId('');
          setLoading(false);
          setVisible({ visible: false, type: 'edit' });
          getAllCategory();

          setRecord();
          if (res?.success === true) {
            message.success('Category Updated Sucessfully!');
          } else {
            message.error(res?.data?.error?.message);
          }
        });
      }
    } else {
      message.error('Image is required');
    }
  };

  const handleCancelModal = () => {
    form.resetFields();
    setVisible(false);
    setImage([]);
    setEditId('');
    setRecord();
    // setTimeout(function () {
    //   window.location.reload(); // Reload the page after 1 second
    // }, 10);
  };
  console.log(editId, 'cancel');

  // function updateImage(file) {
  //   file.url = URL.createObjectURL(file);
  //   setImage((prev) => [...prev, file]);
  // }

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
      <div>
        <PlusOutlined />
      </div>
      <div
        style={{
          margin: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  return (
    <Modal
      title={
        <span style={{ color: '#10181e' }} className="font-medium ">
          {visible.type === 'add' ? (
            <div className=" -ml-6">Add Category</div>
          ) : (
            <div className=" -ml-6">Edit Category</div>
          )}
        </span>
      }
      closable={true}
      footer={null}
      visible={visible?.visible}
      onCancel={handleCancelModal}
      cancelText="as"
      okText="Submit"
      okButtonProps={{ type: 'primary', size: 'large' }}
      cancelButtonProps={{ size: 'large' }}
      okType=""
      width={400}
    >
      <Form layout="vertical" form={form} onFinish={onFinish} className="" name="Add Category">
        <Row gutter={16}>
          <Col xs={18} sm={18} md={12} lg={12} xl={12} className="mt-2 ">
            <Form.Item
              name="name"
              label={<span className="formLabel p-0 mb-0">Name</span>}
              rules={[
                {
                  required: true,
                  message: 'Please enter Category Name!',
                },
              ]}
            >
              <Input style={{ width: '360px' }} size="large" placeholder="Enter category Name" />
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
                width="100%"
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
                      // style:{{fontSizw}}
                      className: `${styles.customModalStyle}`,
                      onOk: () => {
                        resolve(true);

                        setImage((prev) => prev.filter((item) => item._id !== file._id));
                      },
                    });
                  });
                }}
                // onChange={handleChange}
                // beforeUpload={(content) => {
                //   // updateImage(content);
                //   content.url = URL.createObjectURL(content);
                //   setImage((prev) => [...prev, content]);
                //   return false;
                // }}

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
        <div className="flex justify-center gap-4 ">
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            onClick={() => {}}
            loading={loading}
          >
            Submit
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default connect(({ loading, category }) => ({
  categoryDetails: category?.categoryDetails,
  loading: loading.effects['category/addCategory'],
}))(AddCategory);
