import React from "react";
import "tailwindcss/tailwind.css";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex flex-row bg-gray-100">
      {/* Main Content */}
      <main className="flex-1 p-6">
        <header className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Welcome, Admin!</h1>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Profile</button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg">Logout</button>
          </div>
        </header>

        {/* Cards Section */}
        <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card Example */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-700">Total Orders</h2>
            <p className="text-4xl font-bold mt-2 text-gray-900">1,230</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-700">Total Sales</h2>
            <p className="text-4xl font-bold mt-2 text-gray-900">$45,000</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-700">New Customers</h2>
            <p className="text-4xl font-bold mt-2 text-gray-900">120</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-700">Pending Orders</h2>
            <p className="text-4xl font-bold mt-2 text-gray-900">35</p>
          </div>
        </section>

        {/* Table Section */}
        <section className="mt-8">
          <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-3 px-6 text-left text-sm font-semibold text-gray-800">Order ID</th>
                  <th className="py-3 px-6 text-left text-sm font-semibold text-gray-800">Customer</th>
                  <th className="py-3 px-6 text-left text-sm font-semibold text-gray-800">Status</th>
                  <th className="py-3 px-6 text-left text-sm font-semibold text-gray-800">Total</th>
                </tr>
              </thead>
              <tbody>
                {/* Example rows */}
                <tr className="border-b">
                  <td className="py-3 px-6 text-sm text-gray-700">#1234</td>
                  <td className="py-3 px-6 text-sm text-gray-700">John Doe</td>
                  <td className="py-3 px-6 text-sm text-gray-700">Completed</td>
                  <td className="py-3 px-6 text-sm text-gray-700">$120</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-6 text-sm text-gray-700">#5678</td>
                  <td className="py-3 px-6 text-sm text-gray-700">Jane Smith</td>
                  <td className="py-3 px-6 text-sm text-gray-700">Pending</td>
                  <td className="py-3 px-6 text-sm text-gray-700">$85</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
