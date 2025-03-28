import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SecurityCode() {
  const [securityCode, setSecurityCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const securityVerified = sessionStorage.getItem("securityVerified");

  useEffect(() => {
    // If security is already verified, redirect to the register page.
    if (securityVerified === "true") {
      navigate("/register"); // Redirect directly if already verified
    }
  }, [securityVerified, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error message

    try {
      const response = await axios.post('http://localhost:8080/verify-security-code', {
        securityCode: securityCode,
      });

      if (response.data === "Security code is correct!") {
        // Store verification status in sessionStorage
        sessionStorage.setItem("securityVerified", "true");

        // Force rerender or redirect by reloading the page (use this only if necessary)
        window.location.reload(); // This ensures that the page refreshes and reflects the updated session storage
      }
    } catch (err) {
      setError("Invalid security code. Please try again.");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100 rounded-lg">
      {/* Back Button */}
      <button
        onClick={() => navigate("/login")}
        className="cursor-pointer absolute top-4 left-4 flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md shadow-md transition duration-200"
      >
      ◀ Back
      </button>


  
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Enter Security Code for Registration</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input
            type="text"
            placeholder="Enter security code"
            value={securityCode}
            onChange={(e) => setSecurityCode(e.target.value)}
            required
            className="border p-2 rounded w-full mb-3"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full cursor-pointer">
            Verify
          </button>
        </form>
      </div>
    </div>
  );
  
}

export default SecurityCode;
