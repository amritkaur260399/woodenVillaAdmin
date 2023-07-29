import {
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
  DollarCircleOutlined,
} from '@ant-design/icons';
import { Card, Space, Statistic, Typography } from 'antd';
import { connect } from 'umi';

import { RecentOrders } from '@/components/Dashboard/RecentOrders/Index';
import { DashboardChart } from '@/components/Dashboard/Chart/Index';
import { render } from 'react-dom';
import { useEffect } from 'react';
const AnalyticsCard = ({ dispatch, usersList, productList }) => {
  const getAllProducts = () => {
    dispatch({
      type: 'product/getAllProducts',
      payload: {
        query: {
          // id: categoryId,
          startIndex: 0,
          viewSize: 1000,
        },
      },
    });
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllUsers = () => {
    dispatch({
      type: 'users/getAllUsers',
      payload: {
        query: {
          startIndex: 0,
          // keyword,
        },
      },
    }).then((res) => {
      console.log('res', res);
    });
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  console.log(productList?.totalCount, 'usersList?.count');
  const action = (text) => {
    setKeyword(text);
  };
  const arr = [
    {
      id: 1,
      title: 'Orders',
      count: 80000,
      // backgroundColor: 'green',

      icon: (
        <ShoppingCartOutlined
          style={{
            color: '#22c55e',
            backgroundColor: 'lightgreen',
            fontSize: 24,
            padding: 8,
            borderRadius: 100,
          }}
        />
      ),
    },
    {
      id: 2,
      title: 'Customers',
      count: `${usersList?.count}`,
      // backgroundColor: '#2563eb'
      icon: (
        <UserOutlined
          style={{
            color: 'purple',
            backgroundColor: 'lavenderblush',
            fontSize: 24,
            padding: 8,
            borderRadius: 100,
          }}
        />
      ),
    },
    // {
    //   id: 3,
    //   title: 'Revenue',
    //   count: 8000000,
    //   // backgroundColor: '#c026d3',
    //   icon: (
    //     <DollarCircleOutlined
    //       style={{
    //         color: 'red',
    //         backgroundColor: 'lightpink',
    //         fontSize: 24,
    //         padding: 8,
    //         borderRadius: 100,
    //       }}
    //     />
    //   ),
    // },
    {
      id: 4,
      title: 'Products',
      count: `${productList?.totalCount}`,
      // backgroundColor: '#e11d48',
      icon: (
        <ShoppingOutlined
          style={{
            color: 'blue',
            backgroundColor: 'lightblue',
            fontSize: 24,
            padding: 8,
            borderRadius: 100,
          }}
        />
      ),
    },
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        marginTop: '14px',
        alignItems: 'center',
      }}
    >
      <Space size={20} direction="vertical">
        <Typography.Title>Dashboard</Typography.Title>
        <div className="flex flex-wrap gap-4">
          {arr.map((item) => (
            <DashbordCard
              key={item.id}
              icon={item.icon}
              value={item.count}
              title={item.title}
              // backgroundColor={item.backgroundColor}
              color={'white'}
            />
          ))}
        </div>

        <div className="w-full flex gap-4">
          {/*   <DashboardChart className="w-[50%]" /> */}
          <RecentOrders className="w-full" />
        </div>
      </Space>
    </div>
  );
};

// export default AnalyticsCard;

export default connect(({ users, product, loading }) => ({
  productList: product?.productList,
  usersList: users?.usersList,
  loadingProducts: loading.effects['product/getAllProducts'],
  loading: loading.effects['users/getAllUsers'],
}))(AnalyticsCard);

function DashbordCard({ title, value, icon }) {
  return (
    <Card
      style={{
        width: '380px',
        padding: '20px',
        // backgroundColor: '#F7EEE1',
        fontWeight: 'bold',
        color: 'white',
      }}
      // className={styles.DashBoard}
    >
      <Space direction="horizontal">
        {icon}

        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}
