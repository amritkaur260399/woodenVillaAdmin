import React, { useEffect } from 'react';
import { Button, Col, Form, Input, Modal, Popconfirm, Row, Select, Upload, message } from 'antd';
import { connect } from 'umi';
import { PlusOutlined } from '@ant-design/icons';

import styles from './index.less';

import { useState } from 'react';
// const getBase64 = (file) =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = (error) => reject(error);
//   });
const AddProduct = ({
  visible,
  setVisible,
  form,
  dispatch,
  // id,
  productDetails,

  editId,
  categoryList,
  subCategoryList,
  productVariantList,
  getAllProducts,
  subProductVariantList,
  StatsChange,
  setEditId,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [image, setImage] = useState([]);

  const [previewTitle, setPreviewTitle] = useState('');
  const [id, setId] = useState('');
  const [productVariantId, setProductVariantId] = useState('');
  // const [subProductVariantId, setSubProductVariantId] = useState('');
  const [subCategoryId, setSubCategoryId] = useState('');
  const [loading, setLoading] = useState(false);

  const category = productDetails?.product;

  const subcategoryName = category?.subCategory?.name;

  useEffect(() => {
    dispatch({
      type: 'category/getAllCategory',
      payload: { query: { startIndex: 0, viewSize: 10000 } },
    });

    dispatch({
      type: 'productVariant/getProductVariant',
      payload: {
        query: {
          startIndex: 0,
          viewSize: 1000,
        },
      },
    });
  }, []);

  const subCategoryData = () => {
    dispatch({
      type: 'category/getAllSubCategory',
      payload: {
        pathParams: { categoryId: id },
      },
    });
  };
  const subProductVariant = () => {
    dispatch({
      type: 'productVariant/getSubProductVariant',
      payload: {
        pathParams: { id: productVariantId },
      },
    });
  };

  useEffect(() => {
    if (id) subCategoryData();
  }, [id]);
  useEffect(() => {
    if (productVariantId) subProductVariant();
  }, [productVariantId]);

  useEffect(() => {
    if (category?._id) {
      console.log('swcond', productDetails?.product);

      setImage(productDetails?.product?.media);
      form.setFieldsValue({
        subCategoryId: subcategoryName,

        productNameId: category.productNameId,
        // subProductNameId: category?.subProductName?.name,
        description: category.description,
        // inventory: category.inventory,
        price: category.price,
        categoryId: category?.category?.name,
      });
    }
  }, [category?._id]);

  const onFinish = (values) => {
    if (image.length > 0) {
      setLoading(true);

      if (visible.type === 'add') {
        const formData = new FormData();
        formData.append('productNameId', productVariantId);
        // formData.append('subProductNameId', subProductVariantId);
        formData.append('description', values?.description);
        // formData.append('inventory', values?.inventory);
        formData.append('price', values?.price);
        formData.append('categoryId', id);
        formData.append('subCategoryId', subCategoryId);
        image?.map((i) => {
          formData.append('image', i);
        });
        dispatch({
          type: 'product/addProduct',
          payload: {
            body: formData,
          },
        }).then((res) => {
          form.resetFields();
          setImage([]);
          setEditId('');
          setVisible({ visible: false, type: 'add' });
          getAllProducts();

          setLoading(false);

          if (res.success === true) {
            message.success('Product Added Sucessfully!');
          } else {
            message.error(res?.data?.error?.message);
          }
        });
      } else if (visible.type === 'edit') {
        const formData = new FormData();

        if (!productVariantId) {
          formData.append('productNameId', category?.productName?._id);
        } else {
          formData.append('productNameId', productVariantId);
        }
        // if (!subProductVariantId) {
        //   formData.append('subProductNameId', category?.subProductName?._id);
        // } else {
        //   formData.append('subProductNameId', subProductVariantId);
        // }
        formData.append('description', values?.description);
        formData.append('price', values?.price);
        // formData.append('inventory', values?.inventory);
        if (!id) {
          formData.append('categoryId', category?.categoryId);
        } else {
          formData.append('categoryId', id);
        }
        if (!subCategoryId) {
          formData.append('subCategoryId', category?.subCategoryId);
        } else {
          formData.append('subCategoryId', subCategoryId);
        }

        image?.map((i) => {
          if (!!i?._id === false) formData.append('image', i);
        });

        // if (image.length > 0) {
        //   image.forEach((file, id) => {
        //     formData.append(`media`, file);
        //   });
        // }

        dispatch({
          type: 'product/updateProduct',

          payload: {
            body: formData,
            pathParams: { id: editId },
          },
        })
          .then((res) => {
            form.resetFields();
            setImage([]);
            setLoading(false);
            // setEditId('');
            setVisible({ visible: false, type: 'edit' });
            getAllProducts();

            if (res.success === true) {
              message.success('Product Updated Sucessfully!');
            } else {
              message.error('Product  Not Updated !');
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
    setVisible(false);
    setImage([]);
    setEditId('');
  };
  function updateImage(file) {
    file.url = URL.createObjectURL(file);
    setImage((prev) => [...prev, file]);
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
  // const handleChange = ({ image }) => setImage(image);
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
        <span style={{ color: '#10181E' }} className="font-medium">
          {visible.type === 'add' ? (
            <div className="-ml-4">Add Product</div>
          ) : (
            <div className="-ml-4">Edit Product</div>
          )}
        </span>
      }
      closable={true}
      footer={null}
      //   width={800}
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
          <Col xs={18} sm={18} md={12} lg={12} xl={12} className="mt-6">
            <Form.Item
              name="categoryId"
              label={<span className="formLabel p-0 mb-0"> Category</span>}
              rules={[
                {
                  required: true,
                  message: 'Please select category',
                },
              ]}
            >
              <Select
                placeholder="Please Select Category"
                size="large"
                getPopupContainer={(node) => node.parentNode}
                onChange={(e) => {
                  setId(e);
                }}
                options={categoryList?.data?.map((item) => ({
                  value: item?._id,
                  label: item?.name,
                  key: item?._id,
                }))}
              ></Select>
            </Form.Item>
          </Col>
          <Col xs={18} sm={18} md={12} lg={12} xl={12} className="mt-6">
            <Form.Item
              name="subCategoryId"
              label={<span className="formLabel p-0 mb-0"> Sub Category</span>}
              rules={[
                {
                  required: true,
                  message: 'Please Select Sub Category!',
                },
              ]}
            >
              <Select
                placeholder="Please Select Sub Category"
                size="large"
                getPopupContainer={(node) => node.parentNode}
                onChange={(e) => {
                  setSubCategoryId(e);
                }}
                options={subCategoryList?.data?.map((item) => ({
                  value: item?._id,
                  label: item?.name,
                  key: item?._id,
                }))}
              ></Select>
            </Form.Item>
          </Col>

          <Col xs={18} sm={18} md={12} lg={12} xl={12}>
            <Form.Item
              name="productNameId"
              label={<span className="formLabel p-0 mb-0 "> Product Variant</span>}
              rules={[
                {
                  required: true,
                  message: 'Please Select Product Variant!',
                },
              ]}
            >
              <Select
                placeholder="Please Product Variant"
                size="large"
                getPopupContainer={(node) => node.parentNode}
                onChange={(e) => {
                  setProductVariantId(e);
                }}
                options={productVariantList?.data?.map((item) => ({
                  value: item?._id,
                  label: item?.name,
                  key: item?._id,
                  // setId(item._id)
                }))}
              ></Select>
            </Form.Item>
          </Col>

          <Col xs={18} sm={18} md={12} lg={12} xl={12}>
            <Form.Item
              name="description"
              label={<span className="formLabel p-0 mb-0">Description</span>}
              rules={[
                {
                  required: true,
                  message: 'Please enter Product Description!',
                },
              ]}
            >
              <Input size="large" placeholder="Enter Product Description" />
            </Form.Item>
          </Col>
          <Col xs={18} sm={18} md={12} lg={12} xl={12}>
            <Form.Item
              name="price"
              label={<span className="formLabel p-0 mb-0">Price</span>}
              rules={[
                {
                  required: true,
                  message: 'Please enter Product Price!',
                },

                {
                  pattern: /^[0-9]+$/,
                  message: 'Please enter a number!',
                },
              ]}
            >
              <Input
                type="text"
                size="large"
                placeholder="Enter Product Price"
                inputNumberStyle={{ appearance: 'textfield' }}
              />
            </Form.Item>
          </Col>

          {/*
        <Col xs={18} sm={18} md={12} lg={12} xl={12} className="mt-6">
            <Form.Item
              name="subProductNameId"
              label={<span className="formLabel p-0 mb-0"> Sub Product Variant</span>}
              rules={[
                {
                  required: true,
                  message: 'Please Select Sub Product Variant!',
                },
              ]}
            >
              <Select
                placeholder="Please Select Sub Product Variant"
                size="large"
                getPopupContainer={(node) => node.parentNode}
                onChange={(e) => {
                  setSubProductVariantId(e);
                }}
                options={subProductVariantList?.data?.map((item) => ({
                  value: item?._id,
                  label: item?.name,
                  key: item?._id,
                  // setId(item._id)
                }))}
              ></Select>
            </Form.Item>
          </Col>
*/}
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item
              name="image"
              label={<span className="formLabel p-0 mb-0">Images</span>}
              // rules={[
              //   {
              //     required: true,
              //     message: 'Please Select Image  !',
              //   },
              // ]}
            >
              <Upload
                listType="picture-card"
                multiple
                fileList={
                  !loading
                    ? image?.map((img, idx) => ({ ...img, status: 'done', uid: img?.uid }))
                    : [...image?.map((img, idx) => ({ ...img, status: 'done', uid: img?.uid }))]
                }
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
                        if (editId) {
                          setImage((prev) => prev.filter((item) => item._id !== file._id));
                          dispatch({
                            type: 'product/deleteProductImage',
                            payload: {
                              pathParams: {
                                imageId: file._id,
                                productId: editId,
                              },
                            },
                          });
                        } else {
                          setImage((prev) => prev.filter((item) => item.uid !== file.uid));
                        }
                      },
                    });
                  });
                }}
                // onChange={handleChange}
                // beforeUpload={(content) => {
                //   updateImage(content);
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
                {image.length >= 8 ? null : uploadButton}
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
        <div className="flex justify-end gap-4 mt-4">
          <Button
            size="large"
            onClick={() => {
              form.resetFields();
              setVisible({ visible: false, type: 'add' });
            }}
          >
            Back
          </Button>
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
export default connect(({ loading, category, product, productVariant }) => ({
  productVariantList: productVariant?.productVariantList,
  subProductVariantList: productVariant?.subProductVariantList,
  subCategoryList: category?.subCategoryList,
  categoryList: category?.categoryList,
  productDetails: product?.productDetails,
  loadingForSubCategory: loading.effects['category/getAllSubCategory'],
  loadingForCategory: loading.effects['category/getAllCategory'],
  loading: loading.effects['product/addProduct'],
}))(AddProduct);

// <Col xs={18} sm={18} md={12} lg={12} xl={12}>
//   <Form.Item
//     name="inventory"
//     label={<span className="formLabel p-0 mb-0">Inventory</span>}
//     rules={[
//       {
//         required: true,
//         message: 'Please enter Product inventory!',
//       },
//     ]}
//   >
//     <Input type="number" size="large" placeholder="Enter Product inventory" />
//   </Form.Item>
// </Col>
