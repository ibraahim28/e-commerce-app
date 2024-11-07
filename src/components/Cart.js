import React, { useEffect, useState } from "react";
import image from "../img/her-fruits.webp";
import groceryItems from "../data/data";

const Cart = ({ isOpen, toggleCart }) => {
  const [myCart, setMyCart] = useState([]);



  useEffect(() => {
    // Get all IDs stored in localStorage
    const cartIds = Object.values(localStorage).map(Number); // Convert IDs to numbers
    // Filter groceryItems based on the IDs in cartIds
    const cartItems = groceryItems.filter((item) => cartIds.includes(item.id));
    cartItems.map((v) => {
      v.quantity = 1;
      v.totalPrice = v.price;
      
    });
    setMyCart(cartItems);

  }, []);


  

  const removeFromCart = (params) => {
    setMyCart((prevCart = []) =>
      prevCart.filter((cartItem) => cartItem.id !== params.id)
    );

    localStorage.removeItem(params.title);
  };

  const handleQuantity = (item, e) => {
    let newQuantity = e.target.value;

    if (newQuantity <= 0) newQuantity = 1;

    setMyCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.id === item.id
          ? {
              ...cartItem,
              quantity: newQuantity,
              totalPrice: newQuantity * cartItem.price,
            }
          : cartItem
      )
    );
  };

  return (
    <div
      className={`overflow-y-auto p-3 fixed top-0 right-0 h-full w-1/4 z-10 bg-white shadow-lg transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div>
        <button
          onClick={toggleCart}
          className="text-gray-600 hover:bg-primary hover:text-white font-medium transition-all duration-150 px-5 py-2 rounded-md mb-4"
        >
          Close
        </button>
        <div>
          {myCart.length > 0 ? (
            <div>
           { myCart.map((item, index) => (
              <div
                key={index}
                className="cursor-pointer border-b py-4 flex flex-col gap-3"
              >
                <div>
                  <img
                    src={image}
                    alt={item.title}
                    className="w-full h-24 object-cover"
                  />
                </div>
                <div className="text-left">
                  <h3 className="cursor-pointer hover:text-primary font-semibold">
                    {item.title}
                  </h3>
                  <p className="text-sm">{item.category}</p>
                  <p className="text-sm">{item.description}</p>
                </div>
                <div className="flex justify-between items-center w-full p-2">
                  <div className="w-4/5">
                    <p className="text-lg font-medium my-2">
                      PKR {item.totalPrice}
                    </p>
                  </div>
                  <div className="w-1/5 ">
                    <input
                      min={1}
                      className=" self-end border px-3  py-1"
                      type="number"
                      placeholder="1"
                      onChange={(e) => {
                        handleQuantity(item, e);
                      }}
                    />
                  </div>
                </div>
                <div className="mt-2">
                  <button
                    onClick={() => {
                      removeFromCart(item);
                    }}
                    className="text-red-500 hover:underline"
                  >
                    Remove from Cart
                  </button>
                </div>
              </div>
              
            ))}
            <div>
              <h2></h2>
            </div>
            </div>
            
          ) : (
            <h2 className="text-center py-4">No Products here</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
