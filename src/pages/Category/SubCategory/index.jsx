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
import { connect } from 'umi';
import AddSubCategory from './AddSubCategory';
import { debounce } from 'lodash';
import dayjs from 'dayjs';

const SubCategory = ({ dispatch, subCategoryList }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [viewSize, setViewSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [subeditId, setSubEditId] = useState('');
  const { categoryId } = useParams();
  const [isAddModalVisible, setIsAddModalVisible] = useState({ visible: false, type: 'add' });
  const [record, setRecord] = useState('');
  const [form] = Form.useForm();
  const action = (val) => setSearchText(val);
  const debounceSearch = debounce(action, 400);

  const getAllSubCategory = () => {
    dispatch({
      type: 'category/getAllSubCategory',
      payload: {
        pathParams: { categoryId },
        query: {
          startIndex,
          viewSize,
          keyword: searchText,
        },
      },
    });
  };

  useEffect(() => {
    getAllSubCategory();
  }, [startIndex, viewSize, currentPage, searchText]);

  // console.log('subCategoryList :>> ', subCategoryList);
  // const getSingleCategory = () => {
  //   dispatch({
  //     type: 'category/getSingleCategory',
  //     payload: {
  //       pathParams: { id: subeditId },
  //     },
  //   });
  // };

  // useEffect(() => {
  //   if (subeditId) {
  //     getSingleCategory();
  //   }
  // }, [subeditId]);

  const onDeleteData = (id) => {
    dispatch({
      type: 'category/deleteSubCategory',
      payload: {
        pathParams: {
          subCategoryId: id,
        },
      },
    }).then((res) => {
      getAllSubCategory();
      message.success('SubCategory Deleted sucessfully!');
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
      title: 'Sub Category Name',
      key: 'name',
      dataIndex: 'name',
    },
    // {
    //   title: 'Description',
    //   key: 'description',
    //   dataIndex: 'description',
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
      align: 'center',
      render: (record) => (
        <>
          <div className="text-blue-800">
            <Space size={20}>
              <div
                className="w-8 flex justify-center "
                onClick={(e) => {
                  e.stopPropagation();

                  setRecord(record);
                  setSubEditId(record._id);

                  setIsAddModalVisible({ visible: true, type: 'edit' });
                }}
              >
                <EditOutlined />
              </div>

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
        title="SubCategory"
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
            Add SubCategory
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
            dataSource={subCategoryList?.data}
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
                  total={subCategoryList?.count}
                  showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                  onChange={handleChangePagination}
                />
              </Row>
            )}
          />
          {/* </Spin> */}
        </div>
        <AddSubCategory
          visible={isAddModalVisible}
          setVisible={setIsAddModalVisible}
          form={form}
          subeditId={subeditId}
          categoryId={categoryId}
          getAllSubCategory={getAllSubCategory}
          setSubEditId={setSubEditId}
          record={record}
          setRecord={setRecord}
        />
      </Page>
    </>
  );
};

export default connect(({ loading, category }) => ({
  subCategoryList: category?.subCategoryList,
  loading: loading.effects['category/getAllSubCategory'],
}))(SubCategory);
