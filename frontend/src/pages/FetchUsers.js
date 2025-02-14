import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../api/config";
import { getToken } from "../utils/auth/auth";

const FetchUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/fetch`, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = async(id) => {
    try {
      console.log("Delete user:", id);
      const response = await axios.delete(`${BASE_URL}/user/delete/${id}`, { headers:{ Authorization: `Bearer ${getToken()}` } });
      console.log(response.data.data)
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error.response?.data || error.message);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-2xl">
        <h2 className="text-2xl font-semibold mb-4">Users Management</h2>
        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
          <button className="bg-blue-500 text-white p-2 rounded-md">Search</button>
        </div>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter((user) =>
                user.username.toLowerCase().includes(search.toLowerCase())
              )
              .map((user) => (
                <tr key={user.id}>
                  <td className="border p-2">{user.username}</td>
                  <td className="border p-2">{user.email}</td>
                  <td className="border p-2">{user.role}</td>
                  <td className="border p-2">
                    <div className="flex gap-2 justify-center">
                      {/* <button className="bg-green-500 text-white p-1 rounded-md">View</button> */}
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="bg-red-500 text-white p-1 rounded-md"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FetchUsers;
