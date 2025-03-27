import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Profile = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const fullName = sessionStorage.getItem("fullName");
  const email = sessionStorage.getItem("userId");
  const phoneNo = sessionStorage.getItem("phoneNo");


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 rounded-lg relative">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")} 
        className="cursor-pointer absolute top-4 left-4 flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md shadow-md transition duration-200"
      >
        ◀ Back
      </button>

      {/* Profile Card */}
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Profile Information</h2>
        
        {/* Profile Info */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <p className="text-gray-800">{fullName}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <p className="text-gray-800">{email}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <p className="text-gray-800">{phoneNo}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
