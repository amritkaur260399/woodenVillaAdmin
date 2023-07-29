// import React from 'react';
// import { useParams } from 'umi';

// const UserDetail = () => {
//   const { id } = useParams();
//   return <div>{id}</div>;
// };

// export default UserDetail;

import { connect } from 'umi';
import { debounce } from 'lodash';

import Breadcrumbs from '@/components/BreadCrumbs';
import Page from '@/components/Page';
// import Page from '@/components/Page';
// import { useGetCustomer } from '@/hooks/customer/query';
import { EditOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Col,
  Divider,
  // Collapse,
  Drawer,
  Form,
  Input,
  Modal,
  Pagination,
  Row,
  Spin,
  Table,
  Tabs,
  Tag,

  // Tooltip,
} from 'antd';

// import TabPane from 'antd/lib/tabs/TabPane';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useParams } from 'umi';

const { TextArea } = Input;
export function toTitleCase(str) {
  return str?.toString()?.replace(/\w\S*/g, (txt) => {
    return txt?.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

const ViewCustomer = ({ dispatch, singleUser, userList }) => {
  const { TabPane } = Tabs;
  const { id } = useParams();
  // const [form] = Form.useForm();
  const [tab, setTab] = useState('wallet');
  const [emailModal, setEmailModal] = useState(false);
  // const [openDrawer, setOpenDrawer] = useState(false);
  const [basicDetails] = Form.useForm();
  const { tabName } = useParams();
  const [keyword, setKeyword] = useState('');
  const [startIndex, setStartIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewSize, setViewSize] = useState(10);

  console.log('id', id);
  function handleChangePagination(current) {
    setStartIndex(viewSize * (current - 1));
    setCurrentPage(current);
  }

  const columns = [
    {
      title: 'Order Id',
      key: 'Order Id',
      dataIndex: 'orderId',

      // sorter: (a, b) => a.Name.localeCompare(b.Name),
    },
    {
      title: 'Customer',
      key: 'Customer',
      dataIndex: 'customer',
    },
    {
      title: 'Order',
      key: 'Order',
      dataIndex: 'order',
    },
    {
      title: 'Delivery Date',
      key: 'Delivery Date',
      dataIndex: 'deliveryDate',
    },
    {
      title: 'Delivery Status',
      key: 'Delivery Status',
      dataIndex: 'deliveryStatus',
    },
  ];
  const tabs = [
    {
      title: 'All Order',
      key: 'all',
    },
    {
      title: 'Completed',
      key: 'Completed',
    },
    {
      title: 'Pending',
      key: 'Pending',
    },
    {
      title: 'Rejected',
      key: 'Rejected',
    },
  ];
  const action = (text) => {
    setKeyword(text);
  };
  const debounceSearch = debounce(action, 400);

  const getSingleUser = () => {
    dispatch({
      type: 'users/getSingleUser',
      payload: {
        pathParams: { id: id, startIndex, keyword },
      },
    }).then((res) => {
      console.log('res', res);
    });
  };

  useEffect(() => {
    getSingleUser();
  }, [keyword]);

  const ShowDetails = ({ label, text, capitalize }) => {
    return (
      <div className="flex gap-10 border-t py-2 justify-between ">
        <div className="">
          <p className=" pl-4 pt-2 ml-1 text-sm font-semibold text-gray-600">{label}</p>
        </div>
        <div className=" ">
          <p
            className={`mt-2 mr-4 text-right  break-all ${capitalize && 'capitalize'}`}
            style={{ fontWeight: '500' }}
          >
            {text}
          </p>
        </div>
      </div>
    );
  };

  console.log('singleUser', singleUser);

  // console.log(customerDetails, 'customerDetails');

  return (
    <div className="">
      <Page
        title={<div className="py-2 text-orange-900">Client Profile</div>}
        breadcrumbs={
          <Breadcrumbs
            path={[
              {
                name: <div className="text-orange-900">Dashboard</div>,
                path: '/dashboard',
              },
              {
                name: <div className="text-orange-900">Users</div>,
                path: '/users',
              },
              {
                name: <div className="text-orange-900">Users Details</div>,
                path: '#',
              },
            ]}
          />
        }
      >
        <div>
          <div className="mt- bg-white">
            <div className="px-5 flex gap-5 pt-4">
              <Input
                size="large"
                prefix={<SearchOutlined />}
                placeholder="Enter keyword here to search..."
                onChange={(e) => {
                  debounceSearch(e.target.value);
                }}
              />
            </div>
            {/* <Tabs
              activeKey={tabName}
              onTabClick={(key) => {
                // history.push(`/userDetail/${key}`);
              }}
            >
              {tabs?.map((tab) => (
                <TabPane
                  tab={<span className="px-4 text-orange-900">{tab?.title}</span>}
                  key={tab?.key}
                >
                  {tab?.key === tabName && (
                    <div key={tab?.key}>
                      <Divider />
                      <Spin size="large" spinning={loading}>
                        {' '}
                        <Table
                          className="no-shadow zcp-fixed-w-table"
                          rowClassName="cursor-pointer"
                          pagination={false}
                          loading={Boolean(loading)}
                          // scroll={{ x: 1000 }}
                          columns={columns}
                          dataSource={singleUser?.data || []}
                          locale={{
                            emptyText: (
                              <div className="text-center flex justify-center items-center py-10 ">
                                <div>
                                  <p className="text-lg">No user found!</p>
                                  <img
                                    className=""
                                    src={SearchNotFound}
                                    alt="No user profile found!"
                                    style={{ height: '100px' }}
                                  />
                                </div>
                              </div>
                            ),
                          }}
                          
                        />
                      </Spin>
                    </div>
                  )}
                </TabPane>
              ))}
            </Tabs> */}
            {/* <div className="px-5 flex gap-5 mt-4">
              <Input
                size="large"
                prefix={<SearchOutlined />}
                placeholder="Enter keyword here to search..."
                onChange={(e) => {
                  debounceSearch(e.target.value);
                }}
              />
            </div> */}
            <div className="mt-1 p-2">
              <Row gutter={24} className="justify-center ">
                <Col xl={7} lg={17} md={17} sm={18} xs={24}>
                  <div className="main bg-white pb-6 shadow-md rounded-md border">
                    <div className="flex justify-between items-center">
                      <div className="flex   items-center">
                        <div className="p-4">
                          <Avatar
                            icon={<UserOutlined className="" />}
                            size={64}
                            style={{ border: '1px solid brown' }}
                          />
                        </div>
                        <div className="">
                          <p className="  text-xl font-medium text-gray-600 capitalize">
                            {singleUser?.data?.name}
                          </p>
                          {/* <Tag
                            style={{ borderRadius: '100px' }}
                            color={returnStatus('userId')}
                          ></Tag> */}
                        </div>
                      </div>
                    </div>

                    <ShowDetails label="Email" text={singleUser?.data?.email || 'N/A'} />
                    <ShowDetails label="Phone" text={singleUser?.data?.phone || 'N/A'} />
                  </div>
                </Col>
                <Col xl={17} lg={17} md={17} sm={24} xs={24}>
                  <div className=" bg-orange-100  xs:mt-2 rounded-lg border border-gray-800">
                    <Tabs
                      activeKey={tabName}
                      onTabClick={(key) => {
                        // history.push(`/userDetail/${key}`);
                      }}
                    >
                      {tabs?.map((tab) => (
                        <TabPane
                          tab={<span className="px-12 mx-2 ">{tab?.title}</span>}
                          key={tab?.key}
                        >
                          {tab?.key === tabName && (
                            <div key={tab?.key}>
                              <Divider />
                              <Spin size="large" spinning={loading}>
                                <Table
                                  // onRow={(record) => {}}
                                  className="no-shadow zcp-fixed-w-table "
                                  rowClassName="cursor-pointer"
                                  pagination={false}
                                  // loading={Boolean(loading)}
                                  dataSource={[]}
                                  // scroll={{ x: 2000 }}
                                  columns={columns}
                                  locale={{
                                    emptyText: (
                                      <div className="text-center flex justify-center items-center py-10">
                                        <div>
                                          {/* <p className="text-lg">No users found</p> */}
                                          <img
                                            className=""
                                            src={SearchNotFound}
                                            alt="No orders found!"
                                            style={{ height: '100px' }}
                                          />
                                        </div>
                                      </div>
                                    ),
                                  }}
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
                                        total={userList?.totalCount}
                                        showTotal={(total, range) =>
                                          `${range[0]}-${range[1]} of ${total} items`
                                        }
                                        onChange={handleChangePagination}
                                      />
                                    </Row>
                                  )}
                                />
                              </Spin>
                            </div>
                          )}
                        </TabPane>
                      ))}
                    </Tabs>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </Page>

      <Modal
        visible={emailModal}
        title="Send Email"
        onCancel={() => {
          setEmailModal(false);
        }}
      >
        <TextArea
          placeholder="Enter brief description"
          // onInput={(event) => handleInput(event)}
          rows={4}
          size="large"
        />
      </Modal>
    </div>
  );
};
export default connect(({ users }) => ({
  singleUser: users?.singleUser,
}))(ViewCustomer);
