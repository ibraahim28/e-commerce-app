import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getUserRole } from "../utils/auth/auth";
import { FaUpload } from "react-icons/fa6";

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(true); // Track if we're in Signup or Login
  const [formData, setFormData] = useState({ email: "", password: "", username: "", profilePicture: "" });
  const [err, setErr] = useState(null);
  const [fadeIn, setFadeIn] = useState(true); // Track when the fade-in should happen
  const [fadeOut, setFadeOut] = useState(false); // Track when the fade-out should happen
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
        isSignup ? "http://localhost:5001/register" : "http://localhost:5001/login",
        formDataToSend,
        
      );

      console.log("DATA", data);
      if (!data.success) {
        return setErr(data.error || "An error occurred, please try again later");
      }

      localStorage.setItem("auth_token", data.userToken);
      const userRole = getUserRole();
      localStorage.setItem("user_role", userRole);

      setTimeout(() => navigate("/"), 100);
    } catch (error) {
      setErr(error?.response?.data?.message || "Something went wrong");
      console.log(error);
    }
  };


  const toggleTab = () => {

    setFadeOut(true);

    setTimeout(() => {
      setIsSignup(!isSignup);
      setFadeOut(false);
    }, 500);

    // Trigger fade-in animation after the fade-out completes
    setTimeout(() => {
      setFadeIn(true);
    }, 500); // Same duration as fade-out
  };

  useEffect(() => {
    setFadeIn(true); // Trigger fade-in effect when the component first mounts
  }, [isSignup]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-soft-beige">
      <div
        className={`w-full max-w-md bg-white rounded-lg shadow-lg p-8 transition-opacity duration-500 ${fadeOut ? "opacity-0" : "opacity-100"
          }`}
      >
        <h1
          className={`text-2xl font-semibold text-dark-charcoal mb-6 text-center transition-opacity duration-500 ${fadeOut ? "opacity-0" : "opacity-100"
            }`}
        >
          {isSignup ? "Signup" : "Login"}
        </h1>

        {err && (
          <div className="bg-red-200 p-2 rounded-md mb-4">
            <p className="block font-medium text-lg text-tomato-red">{err}</p>
          </div>
        )}

        <div
          className={`space-y-4 transition-opacity duration-500 ${fadeOut ? "opacity-0" : "opacity-100"
            }`}
        >
          <form onSubmit={handleSubmit}  className="space-y-4">
            {isSignup && (
              <>
                <div>
                  <label htmlFor="profilePicture" className="flex rounded-lg shadow-inner shadow-gray-400 cursor-pointer gap-4 justify-center items-center w-full px-4 py-6 bg-gray-100 text-sm">
                    <FaUpload size={20} /> Upload Profile Picture
                    <input type="file"
                      name="profilePicture"
                      id="profilePicture"
                      onChange={(e) => {
                        if (e.target.files.length > 0) {
                          setFormData({ ...formData, profilePicture: e.target.files[0]})
                          console.log(e.target.files[0])
                        }
                      }
                      }
                      className="hidden" />
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
                    placeholder="example123"
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
                placeholder="example@example.com"
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
        </div>

        <div
          className={`mt-4 text-center transition-opacity duration-500 ${fadeOut ? "opacity-0" : "opacity-100"
            }`}
        >
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
