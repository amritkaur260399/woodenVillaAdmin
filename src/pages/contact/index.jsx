import Breadcrumbs from '@/components/BreadCrumbs';
import Page from '@/components/Page';
import { SearchOutlined } from '@ant-design/icons';
import SearchNotFound from '@/assets/icons/empty-search-contact.png';
import {
  Button,
  Col,
  Input,
  message,
  Modal,
  Pagination,
  Row,
  Spin,
  Table,
  Tabs,
  // Menu,
} from 'antd';
import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import { connect } from 'umi';
// import moment from 'moment';
// import { DownOutlined } from '@ant-design/icons';
import { Rate } from 'antd';
import moment from 'moment';
// import './index.less';

const Contact = ({ loading, dispatch, contactList }) => {
  const { TextArea } = Input;
  const [searchText, setSearchText] = useState('');
  const [startIndex, setStartIndex] = useState(0);
  const [viewSize, setViewSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [contactModal, setContactModal] = useState({ visible: false, id: '' });
  const [response, setResponse] = useState('');
  const [keyword, setKeyword] = useState('');

  function handleChangePagination(current) {
    setStartIndex(viewSize * (current - 1));
    setCurrentPage(current);
  }

  const getAllContacts = () => {
    console.log('search', searchText);
    dispatch({
      type: 'contact/getAllContacts',
      payload: {
        query: {
          startIndex: startIndex,
          keyword: searchText,
        },
      },
    }).then((res) => {
      console.log('res', res);
    });
  };

  useEffect(() => {
    getAllContacts();
  }, [startIndex, viewSize, searchText, currentPage, keyword]);
  const action = (val) => {
    setSearchText(val);
    setStartIndex(0);
  };
  const debounceSearch = debounce(action, 500);

  const addResponse = (id) => {
    dispatch({
      type: 'contact/addResponse',

      payload: {
        body: {
          customerId: id,
          response: response,
        },
      },
    })
      .then(() => {
        getAllContacts();
        setContactModal({ visible: false, id: '' });
        message.success('Response sent successfully!');
        setResponse('');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  // const feedbackData = [
  //   {
  //     customerName: 'fdf',
  //     createdAt: 'dsds',
  //     feedback: 'dffs',
  //     productName: 'Furniture',
  //   },
  //   {
  //     customerName: 'karan',
  //     createdAt: 'dsds',
  //     feedback: 'dffs',
  //     productName: 'Furniture',
  //   },
  // ];
  const columns = [
    {
      title: 'Sr no.',
      key: 'srno',
      dataIndex: 'srno',
      render: (_, __, index) => <div> {index + 1 + viewSize * (currentPage - 1)}</div>,
    },
    {
      title: 'Customer Name',
      key: 'Customer Name',
      dataIndex: 'name',
      width: 150,
      // render: (_, record) => <div>{record?.name}</div>,
    },

    {
      title: 'Email',
      key: 'Email',
      dataIndex: 'email',
      width: 200,
      render: (_, record) => <div>{record?.email}</div>,
    },
    {
      title: 'Phone.no',
      key: 'phone',
      dataIndex: 'phone_number',
      width: 200,
      render: (_, record) => <div>{record?.phone_number}</div>,
    },
    {
      title: 'Enquiry',
      key: 'message',
      dataIndex: 'message',
      width: 200,
      // render: (_, record) => <div>{record?.message}</div>,
    },

    {
      title: 'Date',
      key: 'createdAt',
      dataIndex: 'createdAt',
      width: 150,
      render: (record) => <div>{moment(record).format('ll')}</div>,
    },

    {
      title: 'Action',
      align: 'center',
      width: 160,
      render: (__, record) => (
        <>
          <div className="">
            <Button
              type="primary"
              onClick={() => setContactModal({ visible: true, id: record?._id })}
            >
              Respond
            </Button>
          </div>
        </>
      ),
    },
  ];

  return (
    <>
      <Page
        title={<div className="text-orange-900">Enquiry</div>}
        PrevNextNeeded="N"
        breadcrumbs={
          <Breadcrumbs
            path={[
              {
                name: <div className="text-orange-900">Dashboard</div>,
                path: '/dashboard',
              },
              {
                name: <div className="text-orange-900">Enquiry</div>,
                path: '#',
              },
            ]}
          />
        }
      >
        <div className=" ">
          <div className="flex flex-col ">
            <div className="px- pt-5 flex gap-5 mb-4 ">
              <Input
                size="large"
                prefix={<SearchOutlined />}
                placeholder="Enter keyword here to search..."
                onChange={(e) => debounceSearch(e.target.value)}
              />
            </div>
            {/* <div>
              <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="Approved" key="1">
                  {' '}
                </Tabs.TabPane>
                <Tabs.TabPane tab="Requested" key="2">
                  {' '}
                </Tabs.TabPane>
              </Tabs>
            </div> */}
            <Table
              className="shadow-md zcp-fixed-w-table "
              rowClassName="cursor-pointer"
              pagination={false}
              loading={Boolean(loading)}
              dataSource={contactList?.contactUsData || []}
              scroll={{ x: 1000 }}
              columns={columns}
              rowKey="id"
              locale={{
                emptyText: (
                  <div className="text-center flex justify-center items-center py-10 ">
                    <div>
                      <p className="text-lg font-bold text-orange-900">No Enquiry found!</p>
                      <img
                        className=""
                        src={SearchNotFound}
                        alt="No contact found!"
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
                    total={contactList?.totalCount}
                    showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} contact`}
                    onChange={handleChangePagination}
                  />
                </Row>
              )}
            />
            {/* </Spin> */}
          </div>
        </div>

        <Modal
          title={
            <span style={{ color: '#10181e' }} className="font-medium -ml-6">
              Respond to Enquiry
            </span>
          }
          closable={false}
          footer={null}
          width={400}
          open={contactModal.visible}
        >
          <div>
            <Row gutter={16}>
              <Col xs={48} sm={48} md={24} lg={24} xl={24}>
                <TextArea
                  rows={4}
                  style={{ fontSize: '18px' }}
                  onChange={(e) => setResponse(e.target.value)}
                />
              </Col>
            </Row>
            <div className="flex justify-end gap-4 mt-4">
              <Button
                size="large"
                onClick={() => {
                  setContactModal({ visible: false, id: '' });
                }}
              >
                Back
              </Button>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                onClick={() => addResponse(contactModal.id)}
              >
                {console.log('contactModal._id', contactModal.id)}
                Submit
              </Button>
            </div>
          </div>
        </Modal>
      </Page>
    </>
  );
};

export default connect(({ contact, loading }) => ({
  contactList: contact?.contactList,
  loading: loading.effects['contact/getAllContacts'],
}))(Contact);
