import React from 'react';

function Dashboard() {
  return (
    <div className="w-3/4 h-screen p-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-bold">Total Customers</h3>
          <p className="text-2xl">307.48K</p>
          <p className="text-green-500">+30% this month</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-bold">Total Revenue</h3>
          <p className="text-2xl">$30.58K</p>
          <p className="text-red-500">-15% this month</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-bold">Total Deals</h3>
          <p className="text-2xl">2.48K</p>
          <p className="text-green-500">+23% this month</p>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2">Top Selling Products</h3>
        <ul>
          <li className="mb-2">Product 1</li>
          <li className="mb-2">Product 2</li>
          <li className="mb-2">Product 3</li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
