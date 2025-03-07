import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../api/config";
import { getToken } from "../utils/auth/auth";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0)
  const [customers, setCustomers] = useState({}); // Add this line with other state declarations
  const [recentOrders, setRecentOrders] = useState([])
  const navigate = useNavigate();
  useEffect(() => {

    const getTotalCustomers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/fetch`, { headers: { Authorization: `Bearer ${getToken()}` } });
        const users = response.data.data;
        console.log("users=====>>>>", users)
        setTotalCustomers(users.length)
      } catch (error) {
        console.error(error?.response)
      }
    }

    const getPendingOrders = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/order/fetch`, { headers: { Authorization: `Bearer ${getToken()}` } });
        const orders = response.data.data;
        console.log("ORDERSSSS======>>>>>", orders)
        setPendingOrders(orders.length)
      } catch (error) {
        console.error(error?.response)
      }
    }

    const getRecentOrders = async () => {
      try {
        // 1. Fetch recent orders
        const ordersResponse = await axios.get(`${BASE_URL}/order/fetch/recent`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
    
        // 2. Extract orders data
        const fetchedOrders = ordersResponse.data.data;
        setRecentOrders(fetchedOrders);
    
        // 3. Get unique user IDs from orders
        const userIds = [...new Set(fetchedOrders.map(order => order.user))];
    
        // 4. Fetch user data in parallel
        const userResponses = await Promise.allSettled(
          userIds.map(id =>
            axios.get(`${BASE_URL}/user/fetch/${id}`, {
              headers: { Authorization: `Bearer ${getToken()}` },
            })
          )
        );
    
        // 5. Create username mapping
        const customerData = {};
        userResponses.forEach(response => {
          if (response.status === "fulfilled") {
            const user = response.value.data.data;
            customerData[user._id] = user.username;
          }
        });
    
        setCustomers(customerData);
      } catch (error) {
        console.error("Error fetching recent orders:", error);
        setRecentOrders([]);
      }
    };
    

    getTotalCustomers();
    getPendingOrders();
    getRecentOrders();
  }, [])

const handleLogout = async (id) => {
  try {
    localStorage.clear();
    navigate('/')
  } catch (error) {
    
  }
}



  return (
    <div className="min-h-screen flex flex-row bg-gray-100">
      {/* Main Content */}
      <main className="flex-1 p-6">
        <header className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Welcome, Admin!</h1>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg" onClick={handleLogout}>Logout</button>
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
            <h2 className="text-lg font-semibold text-gray-700">Total Customers</h2>
            <p className="text-4xl font-bold mt-2 text-gray-900">{totalCustomers}</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-700">Pending Orders</h2>
            <p className="text-4xl font-bold mt-2 text-gray-900">{pendingOrders}</p>
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
                {recentOrders?.map((order) => (
                  <tr key={order._id} className="border-b">
                    <td className="py-3 px-6 text-sm text-gray-700">
                      #{order.orderId || order._id}
                    </td>
                    <td className="py-3 px-6 text-sm text-gray-700">
                      {customers[order.user] || "Unknown Customer"}
                    </td>
                    <td className="py-3 px-6 text-sm text-gray-700">
                      <span className={`px-2 py-1 rounded ${order.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                        }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-sm text-gray-700">
                      ${order.totalAmount?.toFixed(2)}
                    </td>
                  </tr>
                ))}

                {recentOrders?.length === 0 && (
                  <tr>
                    <td colSpan="4" className="py-4 px-6 text-center text-gray-500">
                      No recent orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
