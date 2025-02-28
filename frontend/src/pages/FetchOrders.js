import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaFilter, FaTimes } from "react-icons/fa";
import { BASE_URL } from "../api/config";
import { getToken } from "../utils/auth/auth";

const OrderModal = ({ order, onClose, onUpdate }) => {
  const [status, setStatus] = useState(order.status);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(
        `${BASE_URL}/order/update/${order._id}`,
        { ...order, status },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      onUpdate(response.data.data);
      onClose();
    } catch (err) {
      console.log(err)
      setError(err.response?.data?.message || "Failed to update order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-4">Edit Order Status</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Order ID</label>
            <p className="text-gray-600 break-words">{order._id}</p>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Customer</label>
            <p className="text-gray-600">{order.customerName}</p>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-fresh-green focus:border-transparent"
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Shipped">Shipped</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-fresh-green text-white rounded-md hover:bg-green-600 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const FetchOrders = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState({});
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Orders
        const ordersResponse = await axios.get(`${BASE_URL}/order/fetch`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        const fetchedOrders = ordersResponse.data.data;
        setOrders(fetchedOrders);

        // Fetch Customers
        const customerIds = [...new Set(fetchedOrders.map(order => order.userId))];
        const customerResponses = await Promise.allSettled(
          customerIds.map(id =>
            axios.get(`${BASE_URL}/user/fetch/${id}`, {
              headers: { Authorization: `Bearer ${getToken()}` },
            })
          )
        );

        const customerData = {};
        customerResponses.forEach(response => {
          if (response.status === "fulfilled") {
            const user = response.value.data.data;
            customerData[user._id] = user.username;
          }
        });
        setCustomers(customerData);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOrderDelete = async (orderId) => {
    try {
      await axios.delete(`${BASE_URL}/order/delete/${orderId}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setOrders(orders.filter(order => order._id !== orderId));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete order");
    }
  };

  const handleOrderUpdate = (updatedOrder) => {
    setOrders(orders.map(order =>
      order._id === updatedOrder._id ? updatedOrder : order
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg mb-6">
        <h1 className="text-xl font-bold text-gray-800">Order Management</h1>
        <button
          onClick={() => setFilterOpen(!filterOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-fresh-green text-white rounded-md shadow-md hover:bg-green-600"
        >
          <FaFilter />
          Filters
        </button>
      </header>

      {error && <p className="text-red-500 mb-4">{error}</p>}

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
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  Loading orders...
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No orders found
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-100 transition-all border-b"
                >
                  <td className="px-6 py-4">{order._id.slice(-6)}</td>
                  <td className="px-6 py-4">
                    {customers[order.userId] || "Unknown Customer"}
                  </td>
                  <td className="px-6 py-4">${order.totalAmount}</td>
                  <td className="px-6 py-4">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${order.status === "Pending"
                        ? "bg-yellow-200 text-yellow-800"
                        : order.status === "Completed"
                          ? "bg-green-200 text-green-800"
                          : order.status === "Cancelled"
                            ? "bg-red-200 text-red-800"
                            : "bg-blue-200 text-blue-800"
                        }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center flex gap-4 justify-center">
                    <button
                      onClick={() => setSelectedOrder({
                        ...order,
                        customerName: customers[order.userId] || "Unknown Customer"
                      })}
                      className="text-fresh-green hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleOrderDelete(order._id)}
                      className="text-tomato-red hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <OrderModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onUpdate={handleOrderUpdate}
        />
      )}
    </div>
  );
};

export default FetchOrders;