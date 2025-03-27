import React, {useState, useEffect} from 'react'
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const UpdateItem = () => {


    const {modelNo} = useParams();
    console.log(modelNo);
    const navigate = useNavigate();
    const [formData, setformData] = useState({
        //itemId: "",
        itemImage: null,
        itemName: "",
        itemCategory: "",
        brand: "",
        modelNo: "",
        itemQty: "",
        itemPrice: "",
        itemDetails: "",
      });

      const categories = [
        "Laptops",
        "Smartphones",
        "Tablets",
        "Headphones",
        "Cameras",
        "Smartwatches",
        "Gaming Consoles",
        "Accessories",
      ];

      const [imagePreview, setImagePreview] = useState(null);

      useEffect(() => {
        fetchItemData();
      }, [modelNo]);
    
      const fetchItemData = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/inventory/${modelNo.toString()}`);
          const itemData = response.data;
          setformData({
            //itemId: itemData.itemId || "",
            itemImage: null,
            itemName: itemData.itemName || "",
            itemCategory: itemData.itemCategory || "",
            brand: itemData.brand || "",
            modelNo: itemData.modelNo || "",
            itemQty: itemData.itemQty || "",
            itemPrice: itemData.itemPrice || "",
            itemDetails: itemData.itemDetails || ""
          });
        } catch (error) {
          console.error("Error fetching item details: ", error);
        }
      };

      const handleInputChange = (e) => {
        const {name, value, files} = e.target;
        setformData({
            ...formData,
            [name]: files ? files[0] : value,
        })
      };

      const handleSubmit =  async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("itemDetails", JSON.stringify({
            //itemId: formData.itemId,
            itemName: formData.itemName,
            itemCategory: formData.itemCategory,
            brand: formData.brand,
            modelNo: formData.modelNo,
            itemQty: formData.itemQty,
            itemPrice: formData.itemPrice,
            itemDetails: formData.itemDetails
        }));
        
        if(formData.itemImage){
            data.append("file", formData.itemImage);
        }
    
        try{
            const response = await axios.put(`http://localhost:8080/inventory/${modelNo.toString()}`, data);
            alert("Item updated");
            navigate("/allitems");
        }catch(error){
            alert("Error update");
            return;
        }
    
      };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 rounded-lg p-6 relative">
      <button
        onClick={() => navigate("/allitems")}
        className="cursor-pointer absolute top-4 left-4 flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md shadow-md transition duration-200"
      >
        ◀ Back
      </button>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg"
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Update Inventory Item
        </h2>
        <div className="space-y-5">
          {/* <input
            type="text"
            id="itemId"
            name="itemId"
            placeholder="Item ID"
            value={formData.itemId}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          /> */}

          {/* Category Dropdown */}
          <select
            id="itemCategory"
            name="itemCategory"
            value={formData.itemCategory}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 bg-white"
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <input
            type="text"
            id="brand"
            name="brand"
            placeholder="Brand"
            value={formData.brand}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />

        
          <input
            type="text"
            id="itemName"
            name="itemName"
            placeholder="Item Name"
            value={formData.itemName}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />
          
          {/* Model Number Input */}
          <input
            type="text"
            id="modelNo"
            name="modelNo"
            placeholder="Model No"
            value={formData.modelNo}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />

          

          <input
            type="number"
            id="itemQty"
            name="itemQty"
            placeholder="Quantity"
            value={formData.itemQty}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="number"
            id="itemPrice"
            name="itemPrice"
            placeholder="Item Price"
            value={formData.itemPrice}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />
          <textarea
            id="itemDetails"
            name="itemDetails"
            placeholder="Item Details"
            value={formData.itemDetails}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            rows="3"
            required
          ></textarea>
          <input
            id="itemImage"
            name="itemImage"
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-40 object-cover rounded-lg mt-3 shadow-md"
            />
          )}
          <button
            type="submit"
            className="cursor-pointer w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg text-lg font-semibold hover:opacity-90 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default UpdateItem
