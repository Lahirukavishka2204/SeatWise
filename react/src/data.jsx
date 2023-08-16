import React from 'react';
import AdminDashboard from './views/admindashboard';



const Data = ({data}) => {
  return (
    <div>
      <h2>Data Display with ApexCharts</h2>
      <AdminDashboard data={data} />
    </div>
  );
};

export default Data;