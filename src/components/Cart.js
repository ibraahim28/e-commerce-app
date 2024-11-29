import React, { useEffect, useState } from "react";
import image from "../img/her-fruits.webp";
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
      const API = await fetchData();
      const cartIds = getProductsFromCart();
      const cartItems = API.filter((item) => cartIds.includes(item.id));

      cartItems.map((v) => {
        v.quantity = 1;
        v.totalPrice = v.price;
      });
      setMyCart(cartItems);
    };
    getDataFromCart();

  }, []); 

  const priceQuantity = (price, quantity) => {
    return price * quantity;
  };
  const totalPrice = () => {
    return myCart.reduce(
      (total, v) => total + priceQuantity(v.price, v.quantity),
      0
    );
  };

  const removeFromCart = (params) => {
    setMyCart((prevCart = []) =>
      prevCart.filter((cartItem) => cartItem.id !== params.id)
    );

    const data = getProductsFromCart();
    const filteredData = data.filter((v) => Number(v) !== Number(params.id));
    addProductToCart(filteredData);
    dispatch(updateCounter("decrease"));
  };

  const handleQuantity = (item, e) => {
    let newQuantity = Number(e.target.value);

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

  const navigateToCheckout = () => {
    navigate("checkout");
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
            <>
              <div>
                {myCart.map((item, index) => (
                  <div
                    key={index}
                    className="cursor-pointer border-b py-4 flex flex-col gap-3"
                  >
                    <div>
                      <img
                        src={item?.image}
                        alt={item.title}
                        className=" mx-auto h-24 w-auto  object-cover"
                      />
                    </div>
                    <div className="text-left">
                      <h3 className="cursor-pointer hover:text-primary font-semibold">
                        {item.title}
                      </h3>
                      <p className="text-sm capitalize font-semibold ">{item.category}</p>
                      <p className="text-sm line-clamp-2">{item.description}</p>
                    </div>
                    <div className="flex justify-between items-center w-full p-2">
                      <div className="w-4/5">
                        <p className="text-lg font-medium my-2">
                          PKR { item.totalPrice || priceQuantity(item.price, item.quantity)}
                        </p>
                      </div>
                      <div className="w-1/5 ">
                        <input
                          min={1}
                          className=" w-full self-end border px-3  py-1"
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
              <div className="flex flex-col gap-3 p-2 ">
                <div className="flex justify-between">
                  <div>
                    <h2 className="font-medium text-xl">Your Total</h2>
                  </div>
                  <div>
                    <h2 className="font-medium text-xl">{totalPrice()}</h2>
                  </div>
                </div>
                <div>
                  <button
                    onClick={navigateToCheckout}
                    className="bg-blue-500 hover:bg-blue-800 text-white text-xl font-medium w-full py-2 rounded-lg  transition-all duration-150"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <h2 className="text-center py-4">No Products here</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
