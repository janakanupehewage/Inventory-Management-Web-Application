import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export default function DisplayItem() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:8080/inventory");
      setItems(response.data);
      setFilteredItems(response.data);
    } catch (error) {
      console.error("Error fetching items: ", error);
    }
  };

  const updateNavigate = (modelNo) => {
    navigate(`/updateitem/${modelNo}`);
  };

  const handleDelete = async (model_No) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`http://localhost:8080/inventory/${model_No.toString()}`);
        setItems(items.filter((item) => item.modelNo !== model_No));
        setFilteredItems(filteredItems.filter((item) => item.modelNo !== model_No));
      } catch (error) {
        console.error("Error deleting item: ", error);
      }
    }
  };

  const handleFilter = () => {
    let filtered = items;
    if (selectedCategory) {
      filtered = filtered.filter((item) => item.itemCategory === selectedCategory);
    }
    if (selectedBrand) {
      filtered = filtered.filter((item) => item.brand === selectedBrand);
    }
    console.log(filtered);
    setFilteredItems(filtered);
  };

  const generatePdf = () => {
    const doc = new jsPDF("portrait");
    doc.text("Inventory Items List", 14, 10);
    autoTable(doc, {
      head: [["Item Category", "Name", "Brand", "Model", "Quantity", "Item Price", "Total Price"]],
      body: filteredItems.map((item) => [
        item.itemCategory,
        item.itemName,
        item.brand,
        item.modelNo,
        item.itemQty,
        item.itemPrice,
        item.itemQty * item.itemPrice,
      ]),
    });
    doc.save("Inventory_items_list.pdf");
  };

  const uniqueCategories = [...new Set(items.map((item) => item.itemCategory))];
  const uniqueBrands = [...new Set(items.map((item) => item.brand))];

  //search functionality
  const [searchQuery, setSearchQuery] = useState("");
  const filteredData = filteredItems.filter(
    (item)=>
      item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.itemCategory.toLowerCase().includes(searchQuery.toLowerCase())

    );


  return (
    <div className="p-6 min-h-screen bg-gradient-to-r from-blue-100 to-gray-200 flex justify-center">
      <div className="w-full max-w-6xl bg-white p-6 shadow-xl rounded-lg">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Inventory Items</h2>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6 justify-center">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-white shadow-sm"
          >
            <option value="">All Categories</option>
            {uniqueCategories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-white shadow-sm"
          >
            <option value="">All Brands</option>
            {uniqueBrands.map((brand) => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>

          <button onClick={handleFilter} className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition">Apply Filters</button>
          <button onClick={() => { setSelectedCategory(""); setSelectedBrand(""); setFilteredItems(items); }} className="bg-gray-600 text-white px-5 py-2 rounded-lg shadow hover:bg-gray-700 transition">Reset</button>
        </div>
        <div className="flex justify-between items-center mb-4 gap-4">
            {/* Search Bar */}
            <div className="relative w-full max-w-sm">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-3 pl-10 text-gray-800 bg-white border rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg
                className="absolute left-3 top-3 w-5 h-5 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35M16 10a6 6 0 1 1-12 0 6 6 0 0 1 12 0z"
                />
              </svg>
            </div>

            {/* Print Button */}
            <button
              onClick={generatePdf}
              className="bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700 transition"
            >
              Print PDF
            </button>
          </div>


        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
            <thead>
              <tr className="bg-blue-500 text-white text-center">
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Brand</th>
                <th className="px-4 py-3">Model No</th>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Quantity</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Total Price</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {searchQuery != null && filteredData.length > 0  ? (
                filteredData.map((item) => (
                  <tr key={item.modelNo} className="border-t hover:bg-gray-100 transition text-center">
                    <td className="px-4 py-3">{item.itemCategory}</td>
                    <td className="px-4 py-3">{item.itemName}</td>
                    <td className="px-4 py-3">{item.brand}</td>
                    <td className="px-4 py-3">{item.modelNo}</td>
                    <td className="px-4 py-3 flex justify-center">
                      <img src={`http://localhost:8080/uploads/${item.itemImage}`} alt={item.itemName} className="w-16 h-16 object-cover rounded shadow" />
                    </td>
                    <td className="px-4 py-3">{item.itemQty}</td>
                    <td className="px-4 py-3">{item.itemPrice}</td>
                    <td className="px-4 py-3">{item.itemQty * item.itemPrice}</td>
                    <td className="px-4 py-3 flex justify-center gap-2">
                      <button onClick={() => updateNavigate(item.modelNo)} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Edit</button>
                      <button onClick={() => handleDelete(item.modelNo)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
                    </td>
                  </tr>
                ))
              ) :  
              
              filteredItems.length > 0  ? (
                filteredItems.map((item) => (
                  <tr key={item.modelNo} className="border-t hover:bg-gray-100 transition text-center">
                    <td className="px-4 py-3">{item.itemCategory}</td>
                    <td className="px-4 py-3">{item.itemName}</td>
                    <td className="px-4 py-3">{item.brand}</td>
                    <td className="px-4 py-3">{item.modelNo}</td>
                    <td className="px-4 py-3 flex justify-center">
                      <img src={`http://localhost:8080/uploads/${item.itemImage}`} alt={item.itemName} className="w-16 h-16 object-cover rounded shadow" />
                    </td>
                    <td className="px-4 py-3">{item.itemQty}</td>
                    <td className="px-4 py-3">{item.itemPrice}</td>
                    <td className="px-4 py-3">{item.itemQty * item.itemPrice}</td>
                    <td className="px-4 py-3 flex justify-center gap-2">
                      <button onClick={() => updateNavigate(item.modelNo)} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Edit</button>
                      <button onClick={() => handleDelete(item.modelNo)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
                    </td>
                  </tr>
                ))
              ) : 

              (
                <tr>
                  <td colSpan="9" className="text-center py-4">No items available.</td>
                </tr>
              )
              
              
              }
              
              
              
              
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
