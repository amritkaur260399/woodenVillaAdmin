import Breadcrumbs from '@/components/BreadCrumbs';
import Page from '@/components/Page';
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  Modal,
  Pagination,
  Popconfirm,
  Row,
  Space,
  Table,
  message,
} from 'antd';
import React, { useEffect, useState } from 'react';
import SearchNotFound from '@/assets/icons/empty-search-contact.png';
// import AddCategory from './AddCategory';
import { connect, history, useParams } from 'umi';
import dayjs from 'dayjs';
import { debounce } from 'lodash';
import AddProductVariants from './AddProductVariants';

const ProductVariants = ({ dispatch, productVariantList }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [viewSize, setViewSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [editId, setEditId] = useState('');
  const [isAddModalVisible, setIsAddModalVisible] = useState({ visible: false, type: 'add' });
  const [form] = Form.useForm();
  const { categoryId } = useParams();

  const action = (val) => setSearchText(val);
  const debounceSearch = debounce(action, 400);

  const getProductVariant = () => {
    dispatch({
      type: 'productVariant/getProductVariant',
      payload: {
        query: {
          startIndex,
          viewSize,
          keyword: searchText,
        },
      },
    });
  };
  console.log(productVariantList, 'productVariantList');
  useEffect(() => {
    getProductVariant();
  }, [startIndex, viewSize, currentPage, searchText]);

  console.log(editId, 'editId');
  const getSingleProductVariant = () => {
    dispatch({
      type: 'productVariant/getSingleProductVariant',
      payload: {
        pathParams: { id: editId },
      },
    });
  };

  useEffect(() => {
    if (editId) {
      getSingleProductVariant();
    }
  }, [editId]);

  // console.log('categoryList :>> ', productVariantList);

  // const editData = (record) => {
  //   setIsAddModalVisible({ visible: true, type: 'edit' });
  //   setEditId(record._id);

  //   form.setFieldsValue({
  //     ...record,
  //   });
  // };

  const onDeleteData = (id) => {
    console.log(id, 'id');
    dispatch({
      type: 'productVariant/deleteProductVariant',
      payload: {
        pathParams: { id },
      },
    }).then((res) => {
      getProductVariant();
      message.success('Product Variant Deleted Sucessfully!');
    });
  };

  function handleChangePagination(current) {
    setStartIndex(viewSize * (current - 1));
    setCurrentPage(current);
  }
  const columns = [
    {
      title: 'Sr no.',
      key: 'srno',
      dataIndex: 'srno',
      render: (_, __, index) => <div> {index + 1 + viewSize * (currentPage - 1)}</div>,
    },
    {
      title: 'Product Variant ',
      key: 'name',
      dataIndex: 'name',
    },

    {
      title: 'Created On',
      key: 'createdAt',
      render: (record) => {
        return <div>{dayjs(record.createdAt).format('DD-MM-YYYY')}</div>;
      },
    },

    {
      title: 'Actions',
      align: 'center',
      render: (record) => (
        <>
          <div className="text-blue-800">
            <Space size={20}>
              <EditOutlined
                onClick={(e) => {
                  e.stopPropagation();
                  setEditId(record._id);
                  setIsAddModalVisible({ visible: true, type: 'edit' });
                }}
              />
              <div className="">
                <Popconfirm
                  title="Are you sure you want to delete?"
                  okText="Yes"
                  okType="primary"
                  cancelText="No"
                  onConfirm={(e) => {
                    e.stopPropagation();
                    onDeleteData(record?._id);
                  }}
                >
                  <a
                    type="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <span className="text-red-700">
                      <DeleteOutlined />
                    </span>
                  </a>
                </Popconfirm>
              </div>
            </Space>
          </div>
        </>
      ),
    },
  ];

  return (
    <>
      <Page
        title="Product Variant"
        PrevNextNeeded="N"
        breadcrumbs={
          <Breadcrumbs
            path={[
              {
                name: 'Dashboard',
                path: '/dashboard',
              },
              {
                name: 'Category',
                path: '/category',
              },

              {
                name: 'Product Variant',
                path: '#',
              },
            ]}
          />
        }
        primaryAction={
          <Button
            type="primary"
            size="large"
            // style={{ borderRadius: '10px' }}
            onClick={() => setIsAddModalVisible({ visible: true, type: 'add' })}
          >
            Add Product Variant
          </Button>
        }
      >
        <div className="bg-white ">
          <div className="px-5 pt-5 flex gap-5 ">
            <Input
              size="large"
              prefix={<SearchOutlined />}
              placeholder="Enter keyword here to search..."
              onChange={(e) => debounceSearch(e?.target?.value)}
            />
          </div>

          {/* <Spin size="large" > */}
          <Table
            className="no-shadow zcp-fixed-w-table mt-4"
            rowClassName="cursor-pointer"
            pagination={false}
            // loading={Boolean(loading)}?.slice().reverse()
            dataSource={productVariantList?.data?.slice().reverse()}
            // scroll={{ x: 1000 }}
            columns={columns}
            locale={{
              emptyText: (
                <div className="text-center flex justify-center items-center py-10">
                  <div>
                    <p className="text-lg">No Category found!</p>
                    <img
                      className=""
                      src={SearchNotFound}
                      alt="No category found!"
                      style={{ height: '100px' }}
                    />
                  </div>
                </div>
              ),
            }}
            // onRow={(record) => {
            //   return {
            //     onClick: () => {
            //       history.push({
            //         pathname: `/productvariants/productsubvariant/${record?._id}`,
            //       });
            //     },
            //   };
            // }}
            footer={() => (
              <Row className="mt-2" type="flex" justify="end">
                <Pagination
                  key={`page-${currentPage}`}
                  showSizeChanger
                  pageSizeOptions={['10', '25', '50', '100']}
                  onShowSizeChange={(e, p) => {
                    setViewSize(p);
                    setCurrentPage(1);
                    setStartIndex(0);
                  }}
                  defaultCurrent={1}
                  current={currentPage}
                  pageSize={viewSize}
                  total={productVariantList?.count}
                  showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                  onChange={handleChangePagination}
                />
              </Row>
            )}
          />
          {/* </Spin> */}
        </div>
        <AddProductVariants
          visible={isAddModalVisible}
          setVisible={setIsAddModalVisible}
          form={form}
          id={editId}
          categoryId={categoryId}
          getProductVariant={getProductVariant}
        />
      </Page>
    </>
  );
};

export default connect(({ loading, productVariant }) => ({
  productVariantList: productVariant?.productVariantList,
  loading: loading.effects['productVariant/getProductVariant'],
}))(ProductVariants);
