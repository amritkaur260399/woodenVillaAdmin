import Breadcrumbs from '@/components/BreadCrumbs';
import Page from '@/components/Page';
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import SearchNotFound from '@/assets/icons/empty-search-contact.png';
import {
  Button,
  Col,
  Input,
  message,
  Modal,
  Pagination,
  Popconfirm,
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

const Feedback = ({ loading, dispatch, feedbackList }) => {
  const { TextArea } = Input;
  const [searchText, setSearchText] = useState('');
  const [startIndex, setStartIndex] = useState(0);
  const [viewSize, setViewSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [feedbackModal, setFeedbackModal] = useState({ visible: false, id: '' });
  const [response, setResponse] = useState('');

  function handleChangePagination(current) {
    setStartIndex(viewSize * (current - 1));
    setCurrentPage(current);
  }
  const action = (val) => {
    setSearchText(val);
    setStartIndex(0);
  };
  const getAllFeedbacks = () => {
    dispatch({
      type: 'feedback/getAllFeedback',
    });
  };

  useEffect(() => {
    getAllFeedbacks();
  }, [startIndex, viewSize, searchText, currentPage]);
  const addResponse = (id) => {
    dispatch({
      type: 'feedback/addResponse',

      payload: {
        body: {
          feedbackId: id,
          response: response,
        },
      },
    })
      .then(() => {
        getAllFeedbacks();
        setFeedbackModal({ visible: false, id: '' });
        message.success('Response sent successfully!');
        setResponse('');
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
  const debounceSearch = debounce(action, 500);
  const columns = [
    {
      title: 'Customer Name',
      key: 'Customer Name',
      dataIndex: 'customerName',
      width: 150,
      render: (_, record) => <div>{record?.customerName.review}</div>,
    },
    {
      title: 'Product Name',
      key: 'productName',
      dataIndex: 'productName',
      width: 200,
    },
    {
      title: 'Feedback',
      key: 'feedback',
      dataIndex: 'feedback',
      width: 400,
    },

    {
      title: 'Rating',
      key: 'rating',
      dataIndex: 'rating',
      width: 200,
      render: () => <Rate disabled defaultValue={2} />,
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
          {/* <Button
              type="primary"
              onClick={() => setFeedbackModal({ visible: true, id: record?._id })}
            >
              Respond
            </Button> */}
          <div className="">
            <Popconfirm
              title="Are you sure you want to delete this Feedback?"
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
        </>
      ),
    },
  ];

  return (
    <>
      <Page
        title={<div className="text-orange-900">Feedbacks</div>}
        PrevNextNeeded="N"
        breadcrumbs={
          <Breadcrumbs
            path={[
              {
                name: <div className="text-orange-900">Dashboard</div>,
                path: '/dashboard',
              },
              {
                name: <div className="text-orange-900">Feedback</div>,
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
              dataSource={feedbackList?.feedbackId}
              scroll={{ x: 1000 }}
              columns={columns}
              rowKey="id"
              locale={{
                emptyText: (
                  <div className="text-center flex justify-center items-center py-10 ">
                    <div>
                      <p className="text-lg font-bold text-orange-900">No feedback found!</p>
                      <img
                        className=""
                        src={SearchNotFound}
                        alt="No feedback found!"
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
                    total={feedbackList?.count}
                    showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
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
            <span style={{ color: '#10181e' }} className="font-medium">
              Respond to Feedback
            </span>
          }
          closable={false}
          footer={null}
          width={800}
          open={feedbackModal.visible}
        >
          <div>
            <Row gutter={16}>
              <Col xs={48} sm={48} md={24} lg={24} xl={24}>
                <TextArea
                  rows={4}
                  style={{ fontSize: '18px' }}
                  //   onChange={(e) => setResponse(e.target.value)}
                />
              </Col>
            </Row>
            <div className="flex justify-end gap-4 mt-4">
              <Button
                size="large"
                onClick={() => {
                  setFeedbackModal({ visible: false, id: '' });
                }}
              >
                Back
              </Button>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                onClick={() => addResponse(feedbackModal.id)}
              >
                Submit
              </Button>
            </div>
          </div>
        </Modal>
      </Page>
    </>
  );
};

export default connect(({ feedbacks, loading }) => ({
  feedbackList: feedbacks?.feedbackList,
  loading: loading.effects['feedbacks/getAllFeedback'],
}))(Feedback);
