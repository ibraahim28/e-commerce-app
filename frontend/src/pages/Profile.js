import React, { useEffect, useState } from 'react';
import { getUserData } from '../utils/auth/auth';
import { FaUser, FaBox, FaShoppingCart, FaCamera } from 'react-icons/fa';
import axios from 'axios';
import { BASE_URL } from '../api/config';
import { fetchData } from '../utils/data/data';
import { addProductToCart, getProductsFromCart } from '../utils/localStorage';
import { useDispatch } from 'react-redux';
import { updateCounter } from '../redux/reducer';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState([]);
  const [profilePictureModal, setProfilePictureModal] = useState(false);
  const [formData, setFormData] = useState({ username: '', profilePicture: '', password: '' });
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const loadData = async () => {
      const data = await getUserData();
      setUserData(data);
      setLoading(false);
    };
    setTimeout(loadData, 1000);
  }, []);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/orders/fetch/user-orders`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
        });
        setOrders(response.data.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    const loadCart = async () => {
      try {
        const API_DATA = await fetchData();
        const cartIds = getProductsFromCart();
        const cartItems = API_DATA.filter((item) => cartIds.includes(item._id));
        const quantityData = JSON.parse(localStorage.getItem('checkoutQuantity')) || [];

        const updatedCart = cartItems.map((v) => {
          const cartItem = quantityData.find((item) => item._id === v._id);
          const quantity = cartItem ? cartItem.quantity : 1;
          return {
            ...v,
            quantity,
            totalPrice: quantity * v.price
          };
        });
        setCart(updatedCart);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    loadOrders();
    loadCart();
  }, []);

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedCart = cart.map(item =>
      item._id === itemId
        ? { ...item, quantity: newQuantity, totalPrice: newQuantity * item.price }
        : item
    );
    setCart(updatedCart);

    // Update localStorage for checkout quantities
    let checkoutQuantity = JSON.parse(localStorage.getItem('checkoutQuantity')) || [];
    const itemIndex = checkoutQuantity.findIndex(item => String(item._id) === String(itemId));

    if (itemIndex !== -1) {
      // Update existing item's quantity
      checkoutQuantity[itemIndex].quantity = newQuantity;
    } else {
      // Add new item with quantity
      checkoutQuantity.push({ _id: itemId, quantity: newQuantity });
    }

    localStorage.setItem('checkoutQuantity', JSON.stringify(checkoutQuantity));
  };

  const handleRemoveItem = (itemId) => {
    const updatedCart = cart.filter(item => item._id !== itemId);
    setCart(updatedCart);

    const data = getProductsFromCart();
    const filteredData = data.filter(v => String(v) !== String(itemId));
    addProductToCart(filteredData);

    dispatch(updateCounter('decrease'));
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setFormData({ ...formData, profilePicture: file });

      // Create a preview URL for the uploaded image
      setPreview(URL.createObjectURL(file));
    }
  };



  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-soft-beige">
        <div className="animate-pulse bg-white p-8 rounded-2xl shadow-glass-lg backdrop-blur-sm">
          Loading...
        </div>
      </div>
    );
  }

  if (profilePictureModal) {
    return (
      <div onClick={() => setProfilePictureModal(false)} className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
        <div onClick={(e) => e.stopPropagation()} className='bg-gradient-to-br from-soft-beige to-fresh-green/10 p-8 rounded-lg shadow-lg w-96'>
          <div className='text-left flex justify-between items-center mb-4'>
            <h2 className='text-md md:text-xl font-bold tracking-tight leading-[1.1]'>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-fresh-green to-dark-charcoal/50">
                Update Profile
              </span>
            </h2>
            <button className=' hover:bg-red-500 hover:text-white px-2 py-1 rounded-md' onClick={() => setProfilePictureModal(false)}>Close</button>
          </div>
          <div className='my-6'>
            <div className="w-full flex justify-center flex-col items-center">

              <label
                htmlFor="profilePicture"
                className="relative flex rounded-full shadow-md shadow-gray-400 cursor-pointer gap-4 justify-center items-center w-28 h-28 bg-gradient-to-b from-gray-100 to-gray-300 text-sm transition-all duration-200 hover:shadow-lg hover:scale-105 "
              >
                {/* Profile Picture Preview or Default Icon */}
                {preview ? (
                  <img
                    src={preview}
                    alt="Profile Preview"
                    className="w-full h-full object-cover rounded-full border-4 border-white shadow-md"
                  />
                ) : (
                  <FaUser size={30} className="text-gray-600" />
                )}

                {/* Camera Icon */}
                <div className="absolute bottom-0 right-0 bg-fresh-green w-9 h-9 rounded-full border-2 border-white flex justify-center items-center p-2 transition-all duration-200 hover:scale-110 shadow-md">
                  <FaCamera size={18} className="text-white" />
                </div>

                {/* Hidden File Input */}
                <input
                  type="file"
                  name="profilePicture"
                  id="profilePicture"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
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
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-beige to-fresh-green/10 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-glass-xl overflow-hidden">
          {/* Profile Header */}
          <div className="px-6 py-8 sm:p-10 bg-gradient-to-r from-fresh-green/10 to-soft-beige/50">
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <div className="group relative">
                <div className="w-24 h-24 rounded-full border-4 border-white shadow-profile transition-transform duration-300 group-hover:scale-105">
                  {userData.profilePicture ? (
                    <img
                      src={`${BASE_URL}${userData.profilePicture}`}
                      alt="profilePicture"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-fresh-green/10 flex items-center justify-center">
                      <FaUser className="text-fresh-green w-8 h-8" />
                    </div>
                  )}
                </div>
                <button onClick={() => setProfilePictureModal(true)} className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white px-4 py-1 rounded-full shadow-md text-sm font-semibold text-fresh-green hover:bg-fresh-green hover:text-white transition-colors duration-200">
                  Edit
                </button>
              </div>

              <div className="text-center sm:text-left">
                <h1 className="text-3xl font-bold text-dark-charcoal mb-2">
                  {userData.username}
                </h1>
                <p className="text-gray-600 font-medium">
                  {userData.email}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-t border-gray-100">
            <nav className="flex space-x-8 justify-center">
              <button
                onClick={() => setActiveTab('orders')}
                className={`py-4 px-1 border-b-2 font-medium flex items-center gap-2 transition-colors ${activeTab === 'orders'
                  ? 'border-fresh-green text-fresh-green'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
              >
                <FaBox className="w-5 h-5" />
                Orders
              </button>
              <button
                onClick={() => setActiveTab('cart')}
                className={`py-4 px-1 border-b-2 font-medium flex items-center gap-2 transition-colors ${activeTab === 'cart'
                  ? 'border-fresh-green text-fresh-green'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
              >
                <FaShoppingCart className="w-5 h-5" />
                Cart
              </button>
            </nav>
          </div>

          {/* Content Section */}
          <div className="px-6 py-8 sm:p-10 bg-white/50">
            {activeTab === 'orders' ? (
              <div className="animate-fade-in">
                <h3 className="text-xl font-semibold text-dark-charcoal mb-6">Recent Orders</h3>
                <div className="bg-gray-50/50 rounded-xl p-6 shadow-inner">
                  {orders.length > 0 ? (
                    orders.map(order => (
                      // Add your order items rendering here
                      <div key={order._id} className="bg-white rounded-lg p-4 mb-4 shadow-sm">
                        Order #{order._id}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-8">No orders yet</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="animate-fade-in">
                <h3 className="text-xl font-semibold text-dark-charcoal mb-6">Shopping Cart</h3>
                <div className="bg-gray-50/50 rounded-xl p-6 shadow-inner">
                  {cart.length > 0 ? (
                    <div className="space-y-6">
                      {cart.map((item) => (
                        <div
                          key={item._id}
                          className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4"
                        >
                          <div className="flex flex-col sm:flex-row gap-4">
                            {/* Product Image */}
                            <div className="w-full sm:w-32 h-32 flex-shrink-0">
                              <img
                                src={`${BASE_URL}${item?.images[0]?.url}` || '/placeholder-product.jpg'}
                                alt={item.name}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            </div>

                            {/* Product Details */}
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="text-lg font-semibold text-dark-charcoal">{item.name}</h4>
                                  <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                                    {item.description || 'Product description not available'}
                                  </p>
                                </div>
                                <button
                                  onClick={() => handleRemoveItem(item._id)}
                                  className="text-gray-400 hover:text-fresh-green transition-colors text-2xl"
                                >
                                  &times;
                                </button>
                              </div>

                              <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                                {/* Quantity Selector */}
                                <div className="flex items-center border rounded-lg">
                                  <button
                                    onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                                    className="px-3 py-1 text-gray-500 hover:text-fresh-green transition-colors"
                                  >
                                    -
                                  </button>
                                  <span className="px-4 py-1 text-gray-700">{item.quantity}</span>
                                  <button
                                    onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                                    className="px-3 py-1 text-gray-500 hover:text-fresh-green transition-colors"
                                  >
                                    +
                                  </button>
                                </div>

                                {/* Price */}
                                <div className="flex items-center gap-4">
                                  <span className="text-lg font-semibold text-fresh-green">
                                    ${item.totalPrice.toFixed(2)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Cart Summary */}
                      <div className="bg-white rounded-lg p-6 mt-8 border-t-4 border-fresh-green">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-semibold">Total Items:</span>
                          <span className="text-gray-700">{cart.length}</span>
                        </div>
                        <div className="flex justify-between items-center mb-6">
                          <span className="font-semibold">Total Price:</span>
                          <span className="text-xl font-bold text-fresh-green">
                            ${cart.reduce((sum, item) => sum + item.totalPrice, 0).toFixed(2)}
                          </span>
                        </div>
                        <button
                          onClick={() => { navigate('/checkout') }}
                          className="w-full bg-fresh-green text-white py-3 rounded-lg hover:bg-dark-charcoal transition-colors duration-200">
                          Proceed to Checkout
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <FaShoppingCart className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                      <p className="text-gray-500">Your cart is empty</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;