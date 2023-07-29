import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '@/components/BreadCrumbs';
import Page from '@/components/Page';
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Divider,
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
import SearchNotFound from '@/assets/icons/empty-search-contact.png';

import { connect, history } from 'umi';
// import AddSubCategory from './AddSubCategory';
import { debounce } from 'lodash';
import dayjs from 'dayjs';
import AddProductSubVariant from './AddProductSubVariant';

const ProductSubVariant = ({ dispatch, subProductVariantList }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [viewSize, setViewSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [editId, setEditId] = useState('');
  const { id } = useParams();
  const [isAddModalVisible, setIsAddModalVisible] = useState({ visible: false, type: 'add' });

  const [form] = Form.useForm();
  const action = (val) => setSearchText(val);
  const debounceSearch = debounce(action, 400);
  console.log(subProductVariantList, 'subProductVariantList');
  const getSubProductVariant = () => {
    dispatch({
      type: 'productVariant/getSubProductVariant',
      payload: {
        pathParams: { id },
        query: {
          startIndex,
          viewSize,
          keyword: searchText,
        },
      },
    });
  };

  useEffect(() => {
    getSubProductVariant();
  }, [startIndex, viewSize, currentPage, searchText]);

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

  const onDeleteData = (id) => {
    console.log(id, 'id');
    dispatch({
      type: 'productVariant/deleteProductVariant',
      payload: {
        pathParams: { id },
      },
    }).then((res) => {
      getSubProductVariant();
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
    // {
    //   title: 'Thumbnail',
    //   key: 'thumbnail',
    //   dataIndex: 'image',
    //   render: (link) => {
    //     return <Avatar src={link} />;
    //   },
    // },
    {
      title: 'Sub Product Variant Name',
      key: 'name',
      dataIndex: 'name',
      //   render: (record) => console.log(record, 'fhdhf'),
    },
    // {
    //   title: 'Description',
    //   key: 'description',
    //   dataIndex: 'description',
    // },
    {
      title: 'Created At',
      key: 'createdAt',
      dataIndex: 'createdAt',
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
                  title="Are you sure you want to delete this SubCategory?"
                  okText="Yes"
                  okType="primary"
                  cancelText="No"
                  onConfirm={(e) => {
                    e.stopPropagation();
                    onDeleteData(record?._id);
                    console.log(record._id, 'Delete data id');
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
        title="SubProductVariant"
        PrevNextNeeded="N"
        breadcrumbs={
          <Breadcrumbs
            path={[
              {
                name: 'Dashboard',
                path: '/dashboard',
              },
              {
                name: 'ProductVariant',
                path: '/productvariants',
              },
              {
                name: 'SubCategory',
                path: '#',
              },
            ]}
          />
        }
        primaryAction={
          <Button
            type="primary"
            size="large"
            style={{ borderRadius: '10px' }}
            onClick={() => setIsAddModalVisible({ visible: true, type: 'add' })}
          >
            Add SubProductVariant
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
            // loading={Boolean(loading)}

            dataSource={subProductVariantList?.data}
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
            //         pathname: `/category/subCategory/${record?._id}`,
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
                  total={subProductVariantList?.count}
                  showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                  onChange={handleChangePagination}
                />
              </Row>
            )}
          />
          {/* </Spin> */}
        </div>
        <AddProductSubVariant
          visible={isAddModalVisible}
          setVisible={setIsAddModalVisible}
          form={form}
          editId={editId}
          id={id}
          getSubProductVariant={getSubProductVariant}
        />
      </Page>
    </>
  );
};

export default connect(({ loading, productVariant }) => ({
  subProductVariantList: productVariant?.subProductVariantList,
  loading: loading.effects['productVariant/getSubProductVariant'],
}))(ProductSubVariant);
