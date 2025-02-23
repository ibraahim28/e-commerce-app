import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getUserRole } from "../utils/auth/auth";
import { FaCamera, FaUser } from "react-icons/fa6";

const AdminAuthPage = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    profilePicture: null,
  });
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const [fadeOut, setFadeOut] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setFormData({ ...formData, profilePicture: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const formDataToSend = new FormData();
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);

    if (isSignup) {
      formDataToSend.append("username", formData.username);
      if (formData.profilePicture) {
        formDataToSend.append("profilePicture", formData.profilePicture);
      }
    }

    try {
      const { data } = await axios.post(
        isSignup 
          ? "http://localhost:5001/admin/create" 
          : "http://localhost:5001/admin/login",
        formDataToSend
      );

      localStorage.setItem("auth_token", data.userToken);
      setTimeout(() => {
        const userRole = getUserRole();
        localStorage.setItem("user_role", userRole);
        navigate("/admin/dashboard");
      }, 100);
    } catch (error) {
      setError(error?.response?.data?.message || "Something went wrong");
    }
  };

  const toggleTab = () => {
    setFadeOut(true);
    setTimeout(() => {
      setIsSignup((prev) => !prev);
      setFadeOut(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-soft-beige p-4">
      <div className={`w-full max-w-md bg-white rounded-lg shadow-lg p-8 transition-opacity duration-500 ${fadeOut ? "opacity-0" : "opacity-100"}`}>
        <h1 className={`text-2xl font-semibold text-dark-charcoal mb-6 text-center transition-opacity duration-500 ${fadeOut ? "opacity-0" : "opacity-100"}`}>
          {isSignup ? "Admin Signup" : "Admin Login"}
        </h1>

        {error && (
          <div className="bg-red-200 p-2 rounded-md mb-4">
            <p className="block font-medium text-lg text-tomato-red">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <>
              <div className="w-full flex justify-center">
                <label
                  htmlFor="profilePicture"
                  className="relative flex rounded-full shadow-md shadow-gray-400 cursor-pointer gap-4 justify-center items-center w-28 h-28 bg-gradient-to-b from-gray-100 to-gray-300 text-sm transition-all duration-200 hover:shadow-lg hover:scale-105"
                >
                  {preview ? (
                    <img
                      src={preview}
                      alt="Profile Preview"
                      className="w-full h-full object-cover rounded-full border-4 border-white shadow-md"
                    />
                  ) : (
                    <FaUser size={30} className="text-gray-600" />
                  )}
                  <div className="absolute bottom-0 right-0 bg-fresh-green w-9 h-9 rounded-full border-2 border-white flex justify-center items-center p-2 transition-all duration-200 hover:scale-110 shadow-md">
                    <FaCamera size={18} className="text-white" />
                  </div>
                  <input
                    type="file"
                    name="profilePicture"
                    id="profilePicture"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <label htmlFor="username" className="block text-sm font-medium text-dark-charcoal">
                  Username:
                </label>
                <input
                  required
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="admin123"
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg text-dark-charcoal focus:ring-2 focus:ring-fresh-green focus:outline-none"
                />
              </div>
            </>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-dark-charcoal">
              Email:
            </label>
            <input
              required
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@example.com"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg text-dark-charcoal focus:ring-2 focus:ring-fresh-green focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-dark-charcoal">
              Password:
            </label>
            <input
              required
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="*******"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg text-dark-charcoal focus:ring-2 focus:ring-fresh-green focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-fresh-green hover:bg-mint-green text-white font-semibold py-2 px-4 rounded-lg transition-all"
          >
            {isSignup ? "Signup" : "Login"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button onClick={toggleTab} className="text-sm text-fresh-green hover:underline">
            {isSignup ? "Already have an admin account? Login" : "Need an admin account? Signup"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAuthPage;