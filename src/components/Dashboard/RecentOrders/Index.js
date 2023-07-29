import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Input, Typography, Table, Modal, Avatar, Rate } from 'antd';
import React from 'react';
import { useState } from 'react';

export function RecentOrders() {
  const arr2 = [
    {
      id: 1,
      key: '1',
      Sr: 1,
      thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
      rating: 5,
      title: 'Mike',
      quantity: 32,
      discountedPrice: 67890,
    },
    {
      id: 2,
      key: '2',
      Sr: 2,
      thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
      rating: 4.69,
      title: 'Mike',
      quantity: 32,
      discountedPrice: 67890,
    },
    {
      id: 3,
      key: '3',
      Sr: 3,
      thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
      rating: 5,
      title: 'Mike',
      quantity: 32,
      discountedPrice: 67890,
    },
    {
      id: 4,
      key: '4',
      Sr: 4,
      thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
      rating: 4.7,
      title: 'Mike',
      quantity: 32,
      discountedPrice: 67890,
    },
    {
      id: 5,
      key: '5',
      Sr: 5,
      thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
      rating: 5,
      title: 'Mike',
      quantity: 32,
      discountedPrice: 67890,
    },
  ];
  const [datasource, setdatasource] = useState(arr2);

  return (
    <div>
      <div className="mt-10 text-2xl">Recent Orders</div>
      <Table
        style={{ marginTop: '16px', width: '120vh' }}
        dataSource={datasource}
        pagination={false}
        columns={[
          {
            title: 'Sr.No',
            dataIndex: 'Sr',
          },
          {
            title: 'Thumbnail',
            dataIndex: 'thumbnail',
            render: (link) => {
              return <Avatar src={link} />;
            },
          },

          {
            title: 'Title',
            dataIndex: 'title',
          },
          {
            title: 'Rating',
            dataIndex: 'rating',
            render: (rating) => {
              return <Rate value={rating} allowHalf disabled />;
            },
          },
          {
            title: 'Quantity',
            dataIndex: 'quantity',
          },
          {
            title: 'Price',
            dataIndex: 'discountedPrice',
          },
        ]}
      ></Table>
    </div>
  );
}
