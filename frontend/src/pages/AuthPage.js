import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getUserRole } from "../utils/auth/auth";
import { FaCamera, FaUser } from "react-icons/fa6";
import { BASE_URL } from "../api/config";

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    profilePicture: null,
  });
  const [preview, setPreview] = useState(null);
  const [err, setErr] = useState(null);
  const [fadeIn, setFadeIn] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setFadeIn(true);
  }, [isSignup]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, profilePicture: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(null);

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
        isSignup ? `${BASE_URL}/register` : `${BASE_URL}/login`,
        formDataToSend
      );

      if (!data.success) {
        setErr(data.error || "An error occurred, please try again later");
        return;
      }

      localStorage.setItem("auth_token", data.userToken);
      localStorage.setItem("user_role", getUserRole());

      setTimeout(() => navigate("/"), 100);
    } catch (error) {
      setErr(error?.response?.data?.message || "Something went wrong");
    }
  };

  const toggleTab = () => {
    setFadeOut(true);
    setTimeout(() => {
      setIsSignup((prev) => !prev);
      setFadeOut(false);
      setFadeIn(true);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-soft-beige">
      <div
        className={`w-full max-w-md bg-white rounded-lg shadow-lg p-8 transition-opacity duration-500 ${
          fadeOut ? "opacity-0" : fadeIn ? "opacity-100" : "opacity-0"
        }`}
      >
        <h1 className="text-2xl font-semibold text-dark-charcoal mb-6 text-center">
          {isSignup ? "Signup" : "Login"}
        </h1>

        {err && (
          <div className="bg-red-200 p-2 rounded-md mb-4">
            <p className="block font-medium text-lg text-tomato-red">{err}</p>
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
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-dark-charcoal"
                >
                  Username:
                </label>
                <input
                  required
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="example123"
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg text-dark-charcoal focus:ring-2 focus:ring-fresh-green focus:outline-none"
                />
              </div>
            </>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-dark-charcoal"
            >
              Email:
            </label>
            <input
              required
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@example.com"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg text-dark-charcoal focus:ring-2 focus:ring-fresh-green focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-dark-charcoal"
            >
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
          <button
            onClick={toggleTab}
            className="text-sm text-fresh-green hover:underline"
          >
            {isSignup
              ? "Already have an account? Login"
              : "Don't have an account? Signup"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
