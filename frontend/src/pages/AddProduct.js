import React, { useState } from "react";
import { BASE_URL } from "../api/config";
import { getToken } from "../utils/auth/auth";
import axios from "axios";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    colors: [],
    sizes: [],
  });

  // const [colorInput, setColorInput] = useState("");
  // const [sizeInput, setSizeInput] = useState("");
  const [altText, setAltText] = useState("");
  const [imageFile, setImageFile] = useState('');

  // Handle general form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // // Add a new color
  // const handleAddColor = () => {
  //   if (colorInput.trim() && !formData.colors.includes(colorInput)) {
  //     setFormData({ ...formData, colors: [...formData.colors, colorInput] });
  //     setColorInput("");
  //   }
  // };

  // // Remove a color
  // const handleRemoveColor = (color) => {
  //   setFormData({
  //     ...formData,
  //     colors: formData.colors.filter((c) => c !== color),
  //   });
  // };

  // // Add a new size
  // const handleAddSize = () => {
  //   if (sizeInput.trim() && !formData.sizes.includes(sizeInput)) {
  //     setFormData({ ...formData, sizes: [...formData.sizes, sizeInput] });
  //     setSizeInput("");
  //   }
  // };

  // // Remove a size
  // const handleRemoveSize = (size) => {
  //   setFormData({
  //     ...formData,
  //     sizes: formData.sizes.filter((s) => s !== size),
  //   });
  // };

  // Handle image upload and alt text
  const handleAddImage = () => {
    if (imageFile && altText.trim()) {
      const newImage = {
        url: URL.createObjectURL(imageFile), // Generate temporary URL for preview
        altText,
      };
      setFormData({
        ...formData,
        images: [...formData.images, newImage],
      });
      setImageFile(null); // Clear file input
      setAltText(""); // Clear alt text
    }
  };

  // // Remove an image
  // const handleRemoveImage = (url) => {
  //   setFormData({
  //     ...formData,
  //     images: formData.images.filter((image) => image.url !== url),
  //   });
  // };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("stock", formData.stock);
    // formDataToSend.append("colors", JSON.stringify(formData.colors));
    // formDataToSend.append("sizes", JSON.stringify(formData.sizes));
    
    // Append the image file if available
    if (imageFile) {
      formDataToSend.append("ProductImage", imageFile);
      // Optionally append alt text if needed
      formDataToSend.append("altText", altText);
    }

    const response = await axios.post(`${BASE_URL}/product/create`, formDataToSend, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        // Let Axios set the Content-Type to multipart/form-data automatically by not overriding it.
      },
    });

    console.log(response.data);
  } catch (error) {
    console.error("Error:", error);
  }
};


  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <form
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-gray-700 mb-6">Add Product</h2>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            placeholder="Enter product name"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            placeholder="Enter product description"
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            placeholder="Enter price"
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="category"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="">Select Category</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Fruits">Fruits</option>
            <option value="Dairy">Dairy</option>
            <option value="Salads">Salads</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Stock */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            placeholder="Enter stock quantity"
          />
        </div>

        {/* Colors */}
        {/* <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Colors</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={colorInput}
              onChange={(e) => setColorInput(e.target.value)}
              className="border rounded-lg p-2 flex-grow"
              placeholder="Enter color"
            />
            <button
              type="button"
              onClick={handleAddColor}
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.colors.map((color, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg flex items-center"
              >
                {color}
                <button
                  type="button"
                  onClick={() => handleRemoveColor(color)}
                  className="text-red-500 ml-2"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div> */}

        {/* Sizes */}
        {/* <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Sizes</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={sizeInput}
              onChange={(e) => setSizeInput(e.target.value)}
              className="border rounded-lg p-2 flex-grow"
              placeholder="Enter size"
            />
            <button
              type="button"
              onClick={handleAddSize}
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.sizes.map((size, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg flex items-center"
              >
                {size}
                <button
                  type="button"
                  onClick={() => handleRemoveSize(size)}
                  className="text-red-500 ml-2"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div> */}

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Upload Image</label>
          <div className="flex items-center gap-2">
            <input
              type="file"
              name="ProductImage"
              onChange={(e)=>{
                if (e.target.files && e.target.files.length > 0) {
                  setImageFile(e.target.files[0]); // Use your dedicated state for file upload.
                }
              }}
              className="border rounded-lg p-2 flex-grow"
              accept="image/*"
            />
            <input
              type="text"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              className="border rounded-lg p-2 flex-grow"
              placeholder="Alt text (required)"
            />
            <button
              type="button"
              onClick={handleAddImage}
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
              disabled={!imageFile || !altText.trim()}
            >
              Add
            </button>
          </div>
        
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-500 text-white w-full rounded-lg py-2 mt-4 font-bold"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
