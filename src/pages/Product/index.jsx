import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '@/components/BreadCrumbs';
import Page from '@/components/Page';
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import {
  Badge,
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
  Tabs,
  Tooltip,
  message,
} from 'antd';
import SearchNotFound from '@/assets/icons/empty-search-contact.png';
import { connect, history } from 'umi';
import { debounce } from 'lodash';
import dayjs from 'dayjs';

import AddProduct from './AddProduct';

const Products = ({ dispatch, productList, stats }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [viewSize, setViewSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [editId, setEditId] = useState('');
  const [tab, setTab] = useState('ALL');
  // const [editData, setEditData] = useState();
  const { TabPane } = Tabs;
  const { categoryId } = useParams();
  const [isAddModalVisible, setIsAddModalVisible] = useState({ visible: false, type: 'add' });

  const [form] = Form.useForm();

  const action = (val) => setSearchText(val);
  const debounceSearch = debounce(action, 400);

  console.log(productList?.count, 'productList?.products');

  const getAllProducts = () => {
    dispatch({
      type: 'product/getAllProducts',
      payload: {
        query: {
          id: categoryId,
          startIndex,
          viewSize,
          keyword: searchText,

          status: tab === 'ACTIVE' ? true : tab === 'IN_ACTIVE' ? false : '',
        },
      },
    });
  };

  useEffect(() => {
    getAllProducts();
  }, [startIndex, viewSize, currentPage, searchText, tab]);

  const getSingleProduct = () => {
    dispatch({
      type: 'product/getSingleProduct',
      payload: {
        pathParams: { id: editId },
      },
    });
  };

  useEffect(() => {
    getSingleProduct();
  }, [editId]);

  const onDeleteData = (id) => {
    dispatch({
      type: 'product/deleteProduct',
      payload: {
        pathParams: {
          id,
        },
      },
    }).then((res) => {
      getAllProducts();

      message.success('Product Deleted Sucessfully!');
    });
  };
  // console.log(productList?.totalCount, 'productList?.totalCount');y

  function handleChangePagination(current) {
    setStartIndex(viewSize * (current - 1));
    setCurrentPage(current);
  }

  const onChangeProductStatus = (id, status) => {
    dispatch({
      type: 'product/updateProductStatus',
      payload: {
        pathParams: {
          id,
        },
        body: {
          status: status ? false : !status && true,
        },
      },
    }).then((res) => {
      console.log(res?.data?.isActive, 'res?.status');
      message.success(
        `${res?.data?.isActive ? 'Product has been Activated' : 'Product has been InActivated'}`,
      );
      getAllProducts();
    });
  };

  const tabs = [
    { key: 'ALL', value: 'All', stats: productList?.count },
    { key: 'ACTIVE', value: 'Active', stats: productList?.activeCount },
    { key: 'IN_ACTIVE', value: 'Inactive', stats: productList?.inActiveCount },
  ];

  const columns = [
    {
      title: 'Sr no.',
      key: 'srno',
      dataIndex: 'srno',
      render: (_, __, index) => <div> {index + 1 + viewSize * (currentPage - 1)}</div>,
    },

    {
      title: 'Category Name',
      key: 'categoryId',
      render: (record) => {
        return <div className=" w-full truncate">{record?.category?.name}</div>;
      },
    },
    {
      title: 'Product Name',
      key: 'subcategoryId',

      render: (record) => {
        return <div className=" w-full truncate">{record?.subCategory?.name}</div>;
      },
    },
    {
      title: 'Product Variant Name',
      key: 'name',
      render: (record) => {
        return <div className=" w-full truncate">{record?.productName?.name}</div>;
      },
    },
    {
      title: 'Description',
      key: 'description',
      width: '100px',
      render: (record) => {
        return (
          <div className=" w-full truncate">
            <Tooltip title={record?.description}>
              <div className=" w-48 truncate">{record.description}</div>
            </Tooltip>
          </div>
        );
      },
    },
    // {
    //   title: 'Price',
    //   key: 'price',
    //   dataIndex: 'price',
    // },

    {
      title: 'Created On',
      key: 'createdAt',

      render: (record) => {
        return <div>{dayjs(record.createdAt).format('DD-MM-YYYY')}</div>;
      },
    },

    {
      title: 'Actions',
      align: 'start',
      width: '200px',
      render: (record) => (
        <>
          <div className="text-blue-800">
            <Space size={20}>
              <div
                className="w-8 flex justify-center "
                onClick={() => {
                  setEditId(record._id);
                  setIsAddModalVisible({ visible: true, type: 'edit' });
                }}
              >
                <EditOutlined />
              </div>
              <div className="">
                <Popconfirm
                  title="Are you sure you want to delete this Product?"
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
              <div className="ml-3">
                <Popconfirm
                  title=<div>
                    {record?.isActive
                      ? 'Are you sure you want to Inactive Product ?'
                      : 'Are you sure you want to Active Product ?'}
                  </div>
                  okText="Yes"
                  okType="primary"
                  cancelText="No"
                  onConfirm={() => {
                    onChangeProductStatus(record?._id, record?.isActive);
                  }}
                >
                  {tab !== 'ALL' && (
                    <div>
                      {record?.isActive ? (
                        <Button type="primary">InActive</Button>
                      ) : (
                        <Button type="primary">Active</Button>
                      )}
                    </div>
                  )}
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
        title="Product"
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
                name: 'Products',
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
            Add Product
          </Button>
        }
      >
        <div className="bg-white ">
          <div className="px-5 pt-5 flex gap-5 ">
            <Input.Search
              size="large"
              prefix={<SearchOutlined />}
              onChange={(e) => debounceSearch(e?.target?.value)}
              placeholder="Enter name to search the product"
              allowClear
              style={{}}
            />
          </div>

          <Tabs
            activeKey={tab}
            onTabClick={(e) => {
              setTab(e);
            }}
            size="large"
          >
            {tabs?.map((item) => (
              <TabPane
                key={item?.key}
                tab={
                  <Badge
                    count={item.stats}
                    style={{
                      fontSize: '10px',
                      marginTop: '-10px',
                      backgroundColor: '#612C13',
                      padding: '0px 4px 0px 4px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                      width: '28px',
                    }}
                    size="small"
                    offset={[6, 0]}
                  >
                    <span className="px-4">{item?.value}</span>
                  </Badge>
                }
              >
                <Table
                  className="no-shadow zcp-fixed-w-table mt-4"
                  rowClassName="cursor-pointer"
                  pagination={false}
                  // loading={Boolean(loading)}

                  dataSource={productList?.products}
                  scroll={{ x: 1000 }}
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
                        total={productList?.totalCount}
                        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                        onChange={handleChangePagination}
                      />
                    </Row>
                  )}
                />
              </TabPane>
            ))}
          </Tabs>
          {/* </Spin> */}
        </div>
        <AddProduct
          visible={isAddModalVisible}
          setVisible={setIsAddModalVisible}
          form={form}
          editId={editId}
          categoryId={categoryId}
          getAllProducts={getAllProducts}
          setEditId={setEditId}
        />
      </Page>
    </>
  );
};

export default connect(({ loading, product }) => ({
  stats: product?.stats,
  productList: product?.productList,
  productDetails: product?.productDetails,
  loading: loading.effects['product/getAllProducts'],
  loading: loading.effects['product/getstats'],
  loadingForSingleProduct: loading.effects['product/getSingleProduct'],
}))(Products);
