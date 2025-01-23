import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaFilter, FaSearch } from "react-icons/fa";
import { BASE_URL } from "../api/config";
import { getToken } from "../utils/auth/auth";

const FetchOrders = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [err, setErr] = useState(null)
  const dummyOrders = [
    {
      id: "ORD12345",
      customer: "John Doe",
      total: "$120",
      date: "2025-01-23",
      status: "Pending",
      payment: "COD",
    },
    {
      id: "ORD12346",
      customer: "Jane Smith",
      total: "$85",
      date: "2025-01-22",
      status: "Completed",
      payment: "Credit Card",
    },
    {
      id: "ORD12347",
      customer: "Mark Taylor",
      total: "$60",
      date: "2025-01-21",
      status: "Shipped",
      payment: "COD",
    },
  ];

  useEffect(()=>{
    try {
      const fetchOrders = async ()=>{
        const response = await axios.get(`${BASE_URL}/order/fetch`, {headers : {
          Authorization : `Bearer ${getToken()}`
        }})
        const orders = response.data.data;
      }
      fetchOrders();
    } catch (error) {
      setErr(error?.response?.data?.message)
    }
  },[])
  
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
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="w-full text-left table-auto">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm font-medium">
            <tr>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Payment</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {dummyOrders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-gray-100 transition-all border-b"
              >
                <td className="px-6 py-4">{order.id}</td>
                <td className="px-6 py-4">{order.customer}</td>
                <td className="px-6 py-4">{order.total}</td>
                <td className="px-6 py-4">{order.date}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      order.status === "Pending"
                        ? "bg-yellow-200 text-yellow-800"
                        : order.status === "Completed"
                        ? "bg-green-200 text-green-800"
                        : "bg-blue-200 text-blue-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4">{order.payment}</td>
                <td className="px-6 py-4 text-center">
                  <button className="text-fresh-green hover:underline">
                    View
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
