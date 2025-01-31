import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaFilter, FaSearch } from "react-icons/fa";
import { BASE_URL } from "../api/config";
import { getToken } from "../utils/auth/auth";

const FetchOrders = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [err, setErr] = useState(null);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState({});
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchOrdersAndCustomers = async () => {
      try {
        // Fetch Orders
        const response = await axios.get(`${BASE_URL}/order/fetch`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });
        const fetchedOrders = response.data.data;
        setOrders(fetchedOrders);

        // Extract unique customer IDs from orders
        const customerIds = [
          ...new Set(fetchedOrders.map((order) => order.userId)),
        ];

        // Fetch all customer data in parallel
        const customerResponses = await Promise.all(
          customerIds.map((id) =>
            axios.get(`${BASE_URL}/user/fetch/${id}`, {
              headers: { Authorization: `Bearer ${getToken()}` },
            })
          )
        );

        // Map customer data by ID for quick lookup
        const customerData = {};
        customerResponses.forEach((res) => {
          customerData[res.data.data._id] = res.data.data.username;
        });

        setCustomers(customerData);
      } catch (error) {
        console.error("Error fetching orders or customers:", error);

        setErr(error?.response?.data?.message || "Something went wrong");
      }
    };

    fetchOrdersAndCustomers();
  }, []);


  const handleOrderDelete = async (orderId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/order/delete/${orderId}`, { headers: { Authorization: `Bearer ${getToken()}` } })
      console.log("Order deleted", response.data)
      setOrders(orders.filter(order => order._id !== orderId));
    } catch (error) {
console.error("Error deleting order:", error);
    }
  }

  const handleOrderEdit = async(orderId)=>{
    try {
      const response = (await axios.get(`${BASE_URL}/order/fetch/${orderId}`, {headers : {Authorization : `Bearer ${getToken()}`}})).data;
      const order = response.data;
      setEditModalOpen(true);
    }catch(error){
      console.error("Error editing order:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header Section */}
      <header className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg mb-6">
        <h1 className="text-xl font-bold text-gray-800">Order Management</h1>
        <button
          onClick={() => setFilterOpen((prev) => !prev)}
          className="flex items-center gap-2 px-4 py-2 bg-fresh-green text-white rounded-md shadow-md hover:bg-green-600"
        >
          <FaFilter />
          Filters
        </button>
      </header>
      {err && (<p>{err}</p>)}
      {/* Filters Section */}
      {filterOpen && (
        <div className="bg-white p-4 shadow-md rounded-lg mb-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-col">
              <label htmlFor="status" className="text-gray-700 font-medium">
                Order Status
              </label>
              <select
                id="status"
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-fresh-green"
              >
                <option value="">All</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Shipped">Shipped</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="payment" className="text-gray-700 font-medium">
                Payment Method
              </label>
              <select
                id="payment"
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-fresh-green"
              >
                <option value="">All</option>
                <option value="COD">COD</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="date" className="text-gray-700 font-medium">
                Date Range
              </label>
              <input
                type="date"
                id="date"
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-fresh-green"
              />
            </div>
          </div>
        </div>
      )}

      {/* Search Section */}
      <div className="bg-white p-4 shadow-md rounded-lg mb-6">
        <div className="relative">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by Order ID or Customer Name"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fresh-green"
          />
        </div>
      </div>

      {/* Orders Table */}

      {editModalOpen && (
        <div className="bg-gray-800/10 h-screen w-screen" onClick={()=>{setEditModalOpen(false)}}>

            <div>
              <form>
                <div>
                  <label htmlFor="order"></label>
                </div>
              </form>
            </div>

        </div>
      )}

      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="w-full text-left table-auto">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm font-medium">
            <tr>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {orders.map((order) => (
              <tr
                key={order._id}
                className="hover:bg-gray-100 transition-all border-b"
              >
                <td className="px-6 py-4">{order._id}</td>
                <td className="px-6 py-4">{customers[order.userId] || "Loading..."}</td>
                <td className="px-6 py-4">{order.totalAmount}</td>
                <td className="px-6 py-4">{order.orderDate}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${order.status === "Pending"
                        ? "bg-yellow-200 text-yellow-800"
                        : order.status === "Completed"
                          ? "bg-green-200 text-green-800"
                          : "bg-blue-200 text-blue-800"
                      }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-center flex gap-4">
                  <button

                    className="text-fresh-green hover:underline">
                    Edit
                  </button>
                  <button
                    onClick={()=>{handleOrderDelete(order._id)}}
                    className="text-tomato-red hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FetchOrders;
