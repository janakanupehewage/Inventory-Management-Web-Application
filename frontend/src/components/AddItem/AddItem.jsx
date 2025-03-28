import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function InventoryForm() {
  const [inventory, setInventory] = useState({
    itemId: "",
    itemImage: "",
    itemName: "",
    itemCategory: "",
    brand: "",
    modelNo: "",
    itemQty: "",
    itemPrice: "",
    itemDetails: "",
  });

  // const {itemId,
  //   itemName,
  //   itemCategory,
  //   brand,
  //   modelNo,
  //   itemQty,
  //   itemPrice,
  //   itemDetails,} = inventory
  const [imagePreview, setImagePreview] = useState(null);

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

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    if(e.target.name === 'itemImage'){
        //setInventory({...inventory, itemImage: e.target.files[0]});
        const file = e.target.files[0];
    setInventory({ ...inventory, itemImage: file });
    setImagePreview(URL.createObjectURL(file)); // Preview the selected image
    }
    else{
        setInventory({...inventory, [e.target.name]: e.target.value});
    }
  };

  const handleSubmit =  async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", inventory.itemImage);
    let imageName = '';

    try{
        const response = await axios.post('http://localhost:8080/inventory/itemImg', formData, {
            headers:{
                'Content-Type': 'multipart/form-data'
            },
        });
        imageName=response.data;
    }catch(error){
        alert("Error uploading image");
        return;
    }

    const updateInventory = {...inventory, itemImage:imageName};

    await axios.post('http://localhost:8080/inventory', updateInventory);
    alert("Item added successfully");
    window.location.reload();

    //console.log("Form Data Submitted: ", inventory);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 rounded-lg p-6 relative">
      <button
        onClick={() => navigate("/")}
        className="cursor-pointer absolute top-4 left-4 flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md shadow-md transition duration-200"
      >
        ◀ Back
      </button>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg"
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Add Inventory Item
        </h2>
        <div className="space-y-5">
          {/* <input
            type="text"
            id="itemId"
            name="itemId"
            placeholder="Item ID"
            value={inventory.itemId}
            onChange={handleImageChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          /> */}

          {/* Category Dropdown */}
          <select
            id="itemCategory"
            name="itemCategory"
            value={inventory.itemCategory}
            onChange={handleImageChange}
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
            value={inventory.brand}
            onChange={handleImageChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />

        
          <input
            type="text"
            id="itemName"
            name="itemName"
            placeholder="Item Name"
            value={inventory.itemName}
            onChange={handleImageChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />
          
          {/* Model Number Input */}
          <input
            type="text"
            id="modelNo"
            name="modelNo"
            placeholder="Model No"
            value={inventory.modelNo}
            onChange={handleImageChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />

          

          <input
            type="number"
            id="itemQty"
            name="itemQty"
            placeholder="Quantity"
            value={inventory.itemQty}
            onChange={handleImageChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="number"
            id="itemPrice"
            name="itemPrice"
            placeholder="Item Price"
            value={inventory.itemPrice}
            onChange={handleImageChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />
          <textarea
            id="itemDetails"
            name="itemDetails"
            placeholder="Item Details"
            value={inventory.itemDetails}
            onChange={handleImageChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            rows="3"
            required
          ></textarea>
          <input
            id="itemImage"
            name="itemImage"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
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
  );
}
