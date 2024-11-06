import React from "react";
import image from "../img/her-fruits.webp";

const Cart = ({ cart, setCart, isOpen, toggleCart }) => {
  return (
    <div
      className={` overflow-y-auto p-3 fixed top-0 right-0 h-full w-1/4 z-10 bg-white shadow-lg transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div>
        <button
          onClick={toggleCart}
          className="text-gray-600 hover:bg-primary hover:text-white font-medium transition-all duration-150 px-5 py-2 rounded-md  mb-4"
        >
          Close
        </button>
        <div>
          {console.log(cart)}
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <div
                key={index}
                className=" cursor-pointer border-b py-4 flex flex-col gap-3"
              >
                <div>
                  <img
                    src={image}
                    alt={item.title}
                    className="w-full h-24 object-cover"
                  />
                </div>
                <div className="text-left">
                  <h3 className=" cursor-pointer hover:text-primary font-semibold">
                    {item.title}
                  </h3>
                  <p className="  text-sm">{item.category}</p>
                  <p className=" text-sm">{item.description}</p>
                </div>
                <div className="mt-2">
                  <button
                    onClick={() =>
                      setCart((prevCart = []) => {
                        return prevCart.filter((cartItem) => cartItem.id !== item.id);
                      })
                    }
                    className="text-red-500 hover:underline"
                  >
                    Remove from Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <h2 className="text-center py-4">No Products here</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
