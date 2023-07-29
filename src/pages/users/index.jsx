import React, { useEffect, useState } from 'react';
import {
  Table,
  Input,
  Row,

  //   Popconfirm,

  //   Form,
  Col,
  Popconfirm,
  Pagination,
} from 'antd';
// import { useParams, useLocation, useHistory, useRouteMatch } from 'react-router-dom';
import { connect, history } from 'umi';

import SearchNotFound from '@/assets/icons/empty-search-contact.png';
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import Breadcrumbs from '@/components/BreadCrumbs';
import Page from '@/components/Page';
import { Button } from 'antd/lib/radio';
import Modal from 'antd/lib/modal/Modal';
import { debounce } from 'lodash';

const User = ({ loading, dispatch, usersList }) => {
  const [tab, setTab] = useState('ALL');
  const [userId, setUserId] = useState('');
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewSize, setViewSize] = useState(10);

  const handleCancel = () => {
    setAddModalVisible(false);
  };
  // const router = useRouter();
  // const onDeleteFeedback = (id) => {
  //   dispatch({
  //     type: 'feedback/deleteFeedback',
  //     payload: {
  //       pathParams: {
  //         id,
  //       },
  //     },
  //   }).then((res) => {
  //     message.success('Feedback Deleted Succesfully!');
  //     // getAllUsers();
  //   });
  // };
  function handleChangePagination(current) {
    setStartIndex(viewSize * (current - 1));
    setCurrentPage(current);
  }

  const getAllUsers = () => {
    dispatch({
      type: 'users/getAllUsers',
      payload: {
        query: {
          startIndex,
          keyword,
        },
      },
    }).then((res) => {
      console.log('res', res);
    });
  };

  useEffect(() => {
    getAllUsers();
  }, [keyword, currentPage, viewSize]);
  const action = (text) => {
    setKeyword(text);
  };
  const debounceSearch = debounce(action, 400);

  const columns = [
    {
      title: 'Sr no.',
      key: 'srno',
      dataIndex: 'srno',
      width: 100,

      render: (_, __, index) => <div> {index + 1 + viewSize * (currentPage - 1)}</div>,
    },
    {
      title: 'Name',
      key: 'Name',
      dataIndex: 'name',
      width: 200,
      // sorter: (a, b) => a.Name.localeCompare(b.Name),
    },
    {
      title: 'Phone.no',
      key: 'phone',
      dataIndex: 'phone',
      width: 200,
    },
    {
      title: 'Email',
      key: 'Email',
      dataIndex: 'email',
      width: 200,
    },

    // {
    //   title: 'Address',
    //   key: 'Address',
    //   dataIndex: 'address',
    // },
    // {
    //   title: 'Actions',
    //   align: 'center',
    //   width: 160,
    //   // render: (record) => (
    //   //   <>
    //   //     <div className="flex justify-center items-center">
    //   //       <div
    //   //         className="mr-4"
    //   //         onClick={() => {
    //   //           // setUserId('');
    //   //           // setAddModalVisible(true);
    //   //         }}
    //   //       >
    //   //         {/* <a type="primary"> */}
    //   //         <span className="text-blue-700">
    //   //           <EditOutlined type="" />
    //   //         </span>
    //   //         {/* </a> */}
    //   //       </div>

    //   //       <div className="">
    //   //         <Popconfirm
    //   //           title="Are you sure you want to delete this user?"
    //   //           okText="Yes"
    //   //           okType="primary"
    //   //           cancelText="No"
    //   //           onConfirm={() => {
    //   //             onDeleteUser('');
    //   //           }}
    //   //         >
    //   //           {/* <a type="primary"> */}
    //   //           <span className="text-red-700">
    //   //             <DeleteOutlined />
    //   //           </span>
    //   //           {/* </a> */}
    //   //         </Popconfirm>
    //   //       </div>
    //   //       <div className="ml-3">
    //   //         <Popconfirm
    //   //           title="Are you sure you want to?"
    //   //           okText="Yes"
    //   //           okType="primary"
    //   //           cancelText="No"
    //   //           onConfirm={() => {
    //   //             console.log(record);
    //   //             onChangeEmployeeStatus(record?._id, record?.isActive);
    //   //           }}
    //   //         >
    //   //           {tab !== 'ALL' && (
    //   //             <div>
    //   //               {/* {record?.isActive ? ( */}(
    //   //               <svg
    //   //                 className="fill-red-500"
    //   //                 xmlns="http://www.w3.org/2000/svg"
    //   //                 viewBox="0 0 640 512"
    //   //                 height={18}
    //   //                 width={18}
    //   //               >
    //   //                 <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L381.9 274c48.5-23.2 82.1-72.7 82.1-130C464 64.5 399.5 0 320 0C250.4 0 192.4 49.3 178.9 114.9L38.8 5.1zM284.3 320h-59C136.2 320 64 392.2 64 481.3c0 17 13.8 30.7 30.7 30.7H528L284.3 320z" />
    //   //               </svg>
    //   //               ) : (
    //   //               <svg
    //   //                 className="fill-green-600"
    //   //                 xmlns="http://www.w3.org/2000/svg"
    //   //                 viewBox="0 0 640 512"
    //   //                 width={18}
    //   //                 height={18}
    //   //               >
    //   //                 <path d="M352 128c0 70.7-57.3 128-128 128s-128-57.3-128-128S153.3 0 224 0s128 57.3 128 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM625 177L497 305c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L591 143c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
    //   //               </svg>
    //   //               ){/* )} */}
    //   //             </div>
    //   //           )}
    //   //         </Popconfirm>
    //   //       </div>
    //   //     </div>
    //   //   </>
    //   // ),
    // },
  ];
  return (
    <>
      <Page
        title={<div className="text-orange-900">Users</div>}
        PrevNextNeeded="N"
        breadcrumbs={
          <Breadcrumbs
            path={[
              {
                name: <div className="text-orange-900">Dashboard</div>,
                path: '/dashboard',
              },
              {
                name: <div className="text-orange-900">Users</div>,
                path: '#',
              },
            ]}
          />
        }
      >
        <div className="px- pt-5 mb-4 flex gap-5  ">
          <Input
            size="large"
            prefix={<SearchOutlined />}
            placeholder="Enter keyword here to search..."
            onChange={(e) => {
              debounceSearch(e.target.value);
            }}
          />
        </div>{' '}
        {/* <div className="bg-white "></div> */}
        <Table
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                history.push(`/userDetail/${record?._id}`);
              },
            };
          }}
          className="no-shadow zcp-fixed-w-table"
          rowClassName="cursor-pointer"
          pagination={false}
          loading={Boolean(loading)}
          dataSource={usersList?.data || []}
          scroll={{ x: 1000 }}
          columns={columns}
          locale={{
            emptyText: (
              <div className="text-center flex justify-center items-center py-10">
                <div>
                  <p className="text-lg">No users found</p>
                  <img
                    className=""
                    src={SearchNotFound}
                    alt="No users found!"
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
                total={usersList?.count}
                showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} users`}
                onChange={handleChangePagination}
              />
            </Row>
          )}
        />
        <Modal
          title="My Modal"
          open={isAddModalVisible}
          onCancel={handleCancel}
          footer={null} // Set footer to null if you don't want a footer
        >
          {/* Modal content goes here */}
          <p>Modal content goes here...</p>
        </Modal>
      </Page>
    </>
  );
};

export default connect(({ users }) => ({
  usersList: users?.usersList,
}))(User);
