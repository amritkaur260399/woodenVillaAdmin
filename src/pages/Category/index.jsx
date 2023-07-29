import Breadcrumbs from '@/components/BreadCrumbs';
import Page from '@/components/Page';
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Divider,
  Form,
  Input,
  Pagination,
  Popconfirm,
  Row,
  Space,
  Table,
  message,
} from 'antd';
import React, { useEffect, useState } from 'react';
import SearchNotFound from '@/assets/icons/empty-search-contact.png';
import AddCategory from './AddCategory';
import { connect, history, useParams } from 'umi';
import dayjs from 'dayjs';
import { debounce } from 'lodash';

const Category = ({ dispatch, categoryList }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [viewSize, setViewSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [editId, setEditId] = useState('');
  const [record, setRecord] = useState();
  const [isAddModalVisible, setIsAddModalVisible] = useState({ visible: false, type: 'add' });
  const [form] = Form.useForm();
  const { categoryId } = useParams();

  const action = (val) => setSearchText(val);
  const debounceSearch = debounce(action, 400);

  const getAllCategory = () => {
    dispatch({
      type: 'category/getAllCategory',
      payload: {
        query: {
          startIndex,
          viewSize,
          keyword: searchText,
        },
      },
    });
  };

  useEffect(() => {
    getAllCategory();
  }, [startIndex, viewSize, currentPage, searchText]);

  // console.log('categoryList :>> ', categoryList);

  // const getSingleCategory = () => {
  //   dispatch({
  //     type: 'category/getSingleCategory',
  //     payload: {
  //       pathParams: { id: editId },
  //     },
  //   });
  // };

  // useEffect(() => {
  //   if (editId) {
  //     getSingleCategory();
  //   }
  // }, [editId]);

  // const editData = (record) => {
  //   setIsAddModalVisible({ visible: true, type: 'edit' });
  //   setEditId(record._id);

  //   form.setFieldsValue({
  //     ...record,
  //   });
  // };

  const onDeleteData = (id) => {
    dispatch({
      type: 'category/deleteCategory',
      payload: {
        pathParams: {
          id,
        },
      },
    }).then((res) => {
      getAllCategory();
      message.success('Category Deleted Sucessfully!');
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
      title: 'Thumbnail',
      key: 'thumbnail',
      dataIndex: 'image',
      render: (_, link) => {
        return <Avatar src={link?.media?.[0]?.url} />;
      },
    },
    {
      title: 'Category',
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
          <div
            className="text-blue-800 h-full "
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Space size={20}>
              <div
                className="w-8 flex justify-center "
                onClick={(e) => {
                  e.stopPropagation();

                  console.log(record, 'record');
                  setRecord(record);
                  setEditId(record._id);

                  setIsAddModalVisible({ visible: true, type: 'edit' });
                }}
              >
                <EditOutlined />
              </div>

              <div className="">
                <Popconfirm
                  title="Are you sure you want to delete this Category?"
                  okText="Yes"
                  okType="primary"
                  cancelText="No"
                  onCancel={(e) => {
                    e.stopPropagation();
                  }}
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
        title="Category"
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
            Add Category
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
            dataSource={categoryList?.data}
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
            onRow={(record) => {
              return {
                onClick: () => {
                  history.push({
                    pathname: `/category/subcategory/${record?._id}`,
                  });
                },
              };
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
                  total={categoryList?.count}
                  showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                  onChange={handleChangePagination}
                />
              </Row>
            )}
          />
          {/* </Spin> */}
        </div>
        <AddCategory
          visible={isAddModalVisible}
          setVisible={setIsAddModalVisible}
          form={form}
          editId={editId}
          categoryId={categoryId}
          getAllCategory={getAllCategory}
          setEditId={setEditId}
          record={record}
          setRecord={setRecord}
        />
      </Page>
    </>
  );
};

export default connect(({ loading, category }) => ({
  categoryList: category?.categoryList,
  loading: loading.effects['category/getAllCategory'],
}))(Category);
