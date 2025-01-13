import { useState, useEffect } from "react";
import axios from "axios";

const SignupPage = () => {
  const [isSignup, setIsSignup] = useState(true); // Track if we're in Signup or Login
  const [formData, setFormData] = useState({ email: "", password: "", username: "" });
  const [error, setError] = useState(null);
  const [fadeIn, setFadeIn] = useState(true); // Track when the fade-in should happen
  const [fadeOut, setFadeOut] = useState(false); // Track when the fade-out should happen

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      setError(null);
      e.preventDefault();
      const { data } = await axios.post(
        isSignup ? "http://localhost:5001/register" : "http://localhost:5001/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("auth_token", data.userToken);
      console.log("Form submitted:", data.userToken);
    } catch (error) {
      setError(error?.response?.data);
    }
  };

  const toggleTab = () => {
    // Trigger fade-out animation when switching tabs
    setFadeOut(true);
    
    // Delay the tab change and fade-in animation to give the fade-out time to complete
    setTimeout(() => {
      setIsSignup(!isSignup); // Toggle between Signup and Login forms
      setFadeOut(false); // Reset fade-out
    }, 500); // 500ms duration for the fade-out

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
        className={`w-full max-w-md bg-white rounded-lg shadow-lg p-8 transition-opacity duration-500 ${
          fadeOut ? "opacity-0" : "opacity-100"
        }`}
      >
        <h1
          className={`text-2xl font-semibold text-dark-charcoal mb-6 text-center transition-opacity duration-500 ${
            fadeOut ? "opacity-0" : "opacity-100"
          }`}
        >
          {isSignup ? "Signup" : "Login"}
        </h1>

        {error && (
          <div className="bg-red-400 p-2 rounded-md mb-4">
            <p className="block font-medium text-lg text-tomato-red">{error}</p>
          </div>
        )}

        <div
          className={`space-y-4 transition-opacity duration-500 ${
            fadeOut ? "opacity-0" : "opacity-100"
          }`}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
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
          className={`mt-4 text-center transition-opacity duration-500 ${
            fadeOut ? "opacity-0" : "opacity-100"
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

export default SignupPage;
