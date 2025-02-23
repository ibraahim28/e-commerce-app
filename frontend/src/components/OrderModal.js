import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../api/config";
import { getToken } from "../utils/auth/auth";

const OrderModal = ({ order, onClose, onSave }) => {
  const [status, setStatus] = useState(order.status);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpdate = async () => {
    setLoading(true);
    setError(null);
    try {
      await axios.put(
        `${BASE_URL}/order/update/${order._id}`,
        { status },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      onSave();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Update Order Status</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <label className="block text-gray-700 font-medium mb-2">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 border rounded-md mb-4"
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Shipped">Shipped</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-fresh-green text-white rounded-md hover:bg-green-600"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
