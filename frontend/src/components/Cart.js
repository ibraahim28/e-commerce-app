import React, { useEffect, useState } from "react";
import { fetchData } from "../utils/data/data";
import { addProductToCart, getProductsFromCart } from "../utils/localStorage";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateCounter } from "../redux/reducer";
import { message } from "antd";
import { BASE_URL } from "../api/config";

const Cart = ({ isOpen, toggleCart }) => {
  const [myCart, setMyCart] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch cart data and initialize quantities
  useEffect(() => {
    const getDataFromCart = async () => {
      try {
        const API_DATA = await fetchData();
        if (Array.isArray(API_DATA)) {
          const cartIds = getProductsFromCart().map((id) => String(id)); 
          const localstorageItem = localStorage.getItem('checkoutQuantity') ;
          const savedQuantities = JSON.parse(localstorageItem || []);
          console.log("savedQuantities =====>>>> ", savedQuantities);

          const cartItems = API_DATA.filter((item) =>
            cartIds.includes(String(item._id)) );

          cartItems.forEach((item) => {
            const savedItem = savedQuantities.find((q) => String(q._id) === String(item._id));
            console.log('Looking for:', String(item._id), 'In:', savedQuantities);
            console.log('Found:', savedItem);
            item.quantity = savedItem ? savedItem.quantity : 1;
            item.totalPrice = item.price * item.quantity;
          });

          setMyCart(cartItems);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      
      
    };

    getDataFromCart();
  }, []);


  useEffect(() => {
    const checkoutQuantityData = myCart.map(({ _id, quantity }) => ({ _id, quantity }));
    localStorage.setItem('checkoutQuantity', JSON.stringify(checkoutQuantityData));
  }, [myCart]);

  // Calculate total price
  const totalPrice = () => {
    return myCart.reduce((total, v) => {
      return total + parseFloat(v.price * v.quantity);
    }, 0).toFixed(2);
  };

  // Remove item from cart
  const removeFromCart = (item) => {
    setMyCart((prevCart) => prevCart.filter((cartItem) => cartItem._id !== item._id));

    // Convert both IDs to strings for comparison
    const cartIds = getProductsFromCart().filter((id) =>
      String(id) !== String(item._id) // Compare as strings
    );

    addProductToCart(cartIds);

    const checkoutQuantity = JSON.parse(localStorage.getItem('checkoutQuantity')) || [];
    const updatedCheckout = checkoutQuantity.filter((q) =>
      String(q._id) !== String(item._id) // Compare as strings
    );

    localStorage.setItem('checkoutQuantity', JSON.stringify(updatedCheckout));
    dispatch(updateCounter("decrease"));
  };
  // Handle quantity change
  const handleQuantity = (item, e) => {
    let newQuantity = Number(e.target.value);
    if (newQuantity <= 0) return;

    setMyCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem._id === item._id
          ? {
            ...cartItem,
            quantity: newQuantity,
            totalPrice: newQuantity * cartItem.price,
          }
          : cartItem
      )
    );

  };

  const navigateToCheckout = () => navigate("checkout");

  return (
    <div
      className={`fixed top-0 right-0 h-screen max-h-screen overflow-y-auto z-10 w-full sm:w-1/3 bg-soft-beige shadow-lg transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "translate-x-full"} 
        `}
    >
      <div className="flex flex-col h-full p-4">
        {/* Header */}
        <button
          onClick={toggleCart}
          className="text-dark-charcoal hover:bg-fresh-green hover:text-white font-medium transition-all duration-150 px-5 py-2 rounded-md mb-4 self-end"
        >
          Close
        </button>

        {/* Cart Items */}
        <div className="flex-1">
          {myCart.length > 0 ? (
            <>
              <div className="divide-y divide-gray-300">
                {myCart.map((item, index) => (
                  <div
                    key={index}
                    className="py-4 flex flex-col gap-3 bg-white rounded-md shadow-md p-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={`${BASE_URL}${item?.images[0]?.url}` || "default-image-url"}
                        alt={item.title}
                        className="h-20 w-20 sm:h-24 sm:w-24 object-cover rounded-md border border-gray-300"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-dark-charcoal hover:text-fresh-green cursor-pointer">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500 capitalize">
                          {item.category}
                        </p>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-lg font-medium text-dark-charcoal">
                        PKR {item.totalPrice}
                      </p>
                      <input
                        min={1}
                        className="w-16 border px-2 py-1 rounded-md"
                        type="number"
                        placeholder="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantity(item, e)}
                      />
                    </div>
                    <button
                      onClick={() => removeFromCart(item)}
                      className="text-tomato-red hover:underline mt-2"
                    >
                      Remove from Cart
                    </button>
                  </div>
                ))}
              </div>

              {/* Total Section */}
              <div className="mt-4 p-4 bg-light-coral rounded-md shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-dark-charcoal">
                    Your Total
                  </h2>
                  <h2 className="text-lg font-medium text-dark-charcoal">
                    {totalPrice()} PKR
                  </h2>
                </div>
                <button
                  onClick={navigateToCheckout}
                  className="bg-fresh-green hover:bg-fresh-green/80 text-white text-lg font-medium w-full py-2 rounded-lg transition-all duration-150"
                >
                  Checkout
                </button>
              </div>
            </>
          ) : (
            <h2 className="text-center text-dark-charcoal py-4">
              No Products Here
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;