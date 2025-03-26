import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import UserImage from '../../assets/usernew.png';

const Header = ({ userEmail, setUserEmail }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setUserEmail(sessionStorage.getItem("userId"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [setUserEmail]);

  const handleLogout = () => {
    sessionStorage.removeItem("userId");
    setUserEmail(null); // Update state immediately
    navigate("/login", { replace: true }); // Redirect to login after logout
  };

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">Inventory Management System</h1>

      <div className="flex items-center gap-4">
        {userEmail ? (
          <>
            <Link to="/profile" className="flex items-center gap-2">
              <img
                src={UserImage}
                alt="Profile"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
              <span>{userEmail}</span>
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/register"
            className="bg-green-500 px-4 py-2 rounded-md hover:bg-green-700 transition"
          >
            Register
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
