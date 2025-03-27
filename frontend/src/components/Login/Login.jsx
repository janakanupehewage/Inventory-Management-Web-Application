import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State to track loading

  const navigate = useNavigate();  // Create navigate function

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true); // Set loading to true when login is being processed

    try {
      const response = await fetch("https://inventory-management-web-applica-production.up.railway.app/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include", // Ensures session data is stored
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();

      // Store user ID in session storage
      sessionStorage.setItem("userId", formData.email);
      sessionStorage.setItem("fullName", data.fullName);  // Save full name
      sessionStorage.setItem("phoneNo", data.phoneNo);

      // Update the user state in App
      setUser(formData.email);

      // Redirect to the dashboard
      navigate("/");  // Redirect to the dashboard using navigate

    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false); // Set loading to false once the request is completed
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 rounded-lg">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login to Your Account
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>} {/* Show error message if any */}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="cursor-pointer w-full bg-blue-600 text-white p-3 rounded-lg shadow-md hover:bg-blue-700 transition flex items-center justify-center"
            disabled={isLoading}  // Disable button while loading
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  d="M4 12a8 8 0 1 0 16 0"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                  fill="none"
                />
              </svg>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
