import React from 'react';
import { Table } from 'antd';

const DashboardTable = ({ columns, data, pageSize }) => {
  return (
    <Table columns={columns} dataSource={data} pagination={{ pageSize: pageSize }} scroll={{ x: 576, y: 650 }} size={'small'} />
  );
};

export default DashboardTable;