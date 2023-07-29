import React from 'react';

import { Chart } from 'react-google-charts';

export const data = [
  ['Month', 'Sales'],
  ['Jan', 1000],
  ['Feb', 1170],
  ['Mar', 660],
  ['Apr', 1030],
  ['May', 1000],
  ['Jun', 1170],
  ['July', 660],
  ['Aug', 1030],
  ['Sep', 1000],
  ['Oct', 1170],
  ['Nov', 660],
  ['Dec', 1030],
];

export const options = {
  chart: {
    title: 'Company Performance',
    subtitle: 'Sales, Expenses, and Profit: 2014-2017',
  },
};

export function DashboardChart() {
  return (
    <div className="w-full">
      <div className="mt-10 text-2xl ">Sales</div>
      <Chart
        className="mt-4"
        chartType="Line"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    </div>
  );
}
