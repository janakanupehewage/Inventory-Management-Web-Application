import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaBoxOpen, FaMoneyBillWave } from "react-icons/fa";

// Custom Card Component
const CustomCard = ({ icon, title, value, color }) => (
  <div className="p-6 bg-white shadow-md rounded-2xl flex items-center gap-3 hover:shadow-xl transition border border-gray-200 w-full max-w-xs">
    <div className={`text-5xl ${color}`}>{icon}</div>
    <div>
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className="text-3xl font-bold text-indigo-800">{value}</p>
    </div>
  </div>
);

function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    categoryStats: [],
    totalRevenue: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/admin/dashboard/stats");
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Buttons in Top Right Corner */}
      <div className="flex justify-end gap-4">
        <button onClick={() => navigate("/additem")} className="bg-blue-600 cursor-pointer text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700">
          Add Item
        </button>
        <button onClick={() => navigate("/allItems")} className="bg-green-600 cursor-pointer text-white px-6 py-3 rounded-lg shadow hover:bg-green-700">
          Display Items
        </button>
      </div>

      {/* Dashboard Content Below */}
      <div className="flex flex-wrap justify-center gap-6 mt-4">
        <CustomCard icon={<FaUsers />} title="Total Admins" value={stats.totalUsers} color="text-blue-800" />
        <CustomCard icon={<FaMoneyBillWave />} title="Total Revenue" value={`Rs. ${stats.totalRevenue.toLocaleString("en-IN")}`} color="text-green-600" />
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        {stats.categoryStats.slice(0, 4).map((category, index) => (
          <CustomCard
            key={index}
            icon={<FaBoxOpen />}
            title={category.category}
            value={`Products: ${category.totalProducts}, Rs. ${category.totalPrice.toLocaleString("en-IN")}`}
            color="text-orange-600"
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
