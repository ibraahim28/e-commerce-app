import React, { useEffect, useState } from "react";
import { fetchData } from "../utils/data/data";
import { addProductToCart, getProductsFromCart } from "../utils/localStorage";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateCounter } from "../redux/reducer";

const Cart = ({ isOpen, toggleCart }) => {
  const [myCart, setMyCart] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getDataFromCart = async () => {
      try {
        const API_DATA = await fetchData();
        if (Array.isArray(API_DATA)) {
          const cartIds = getProductsFromCart();
          const cartItems = API_DATA.filter((item) =>
            cartIds.includes(item._id)
          );

          cartItems.forEach((v) => {
            v.quantity = 1;
            v.totalPrice = v.price * v.quantity;
          });

          setMyCart(cartItems);
        } else {
          console.error("API_DATA is not an array:", API_DATA);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getDataFromCart();
  }, []);

  const priceQuantity = (price, quantity) => price * quantity;

  const totalPrice = () => {
    return myCart.reduce((total, v) => {
      const itemPrice = Number(v.price) || 0;
      const itemQuantity = Number(v.quantity) || 0;
      return total + priceQuantity(itemPrice, itemQuantity);
    }, 0);
  };

  const removeFromCart = (params) => {
    setMyCart((prevCart = []) =>
      prevCart.filter((cartItem) => cartItem._id !== params._id)
    );

    const data = getProductsFromCart();
    const filteredData = data.filter((v) => String(v) !== String(params._id));
    addProductToCart(filteredData);
    dispatch(updateCounter("decrease"));
  };

  const handleQuantity = (item, e) => {
    let newQuantity = Number(e.target.value);

    if (newQuantity <= 0) newQuantity = 1;

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
      className={`fixed top-0 right-0 max-h-full overflow-y-auto z-10 bg-soft-beige shadow-lg transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "translate-x-full"} 
        w-full sm:w-1/3`}
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
                        src={item?.image}
                        alt={item.title}
                        className="h-20 w-20 sm:h-24 sm:w-24 object-cover rounded-md border border-gray-300"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-dark-charcoal hover:text-fresh-green cursor-pointer">
                          {item.title}
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
                        PKR{" "}
                        {item.totalPrice ||
                          priceQuantity(item.price, item.quantity)}
                      </p>
                      <input
                        min={1}
                        className="w-16 border px-2 py-1 rounded-md"
                        type="number"
                        placeholder="1"
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
                    {`${totalPrice()} PKR`}
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
