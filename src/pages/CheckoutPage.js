import React, { useState, useEffect } from "react";
import { getProductsFromCart } from "../utils/localStorage/index";
import { BASE_URL } from "../api/config";
import { fetchData } from "../utils/data/data";

const CheckoutPage = () => {
  const [myCart, setMyCart] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const cartIds = getProductsFromCart();

    const filteredData = data.filter((item) => cartIds.includes(item.id));
    setMyCart(filteredData);
  }, [data]);

  useEffect(() => {
    const getData = async () => {
      const API_DATA = await fetchData();
      setData(API_DATA);
    };
    getData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Checkout Form</h2>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="johndoe@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="123 Main Street, Karachi"
                />
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Karachi"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="03012345678"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-500 text-white font-medium rounded-lg py-2 hover:bg-indigo-600"
              >
                Place Order
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4 overflow-y-auto max-h-[500px]">
              {myCart.length > 0 ? (
                myCart.map((item, index) => (
                  <>
                    <div
                      key={index}
                      className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 mx-4">
                        <p className="text-lg text-gray-700 font-bold">
                          {item.title}
                        </p>
                        <p className="text-sm text-gray-500 line-clamp-3 border-b-2 mb-2 pb-1">
                          {item.description}
                        </p>
                        <p className="text-sm text-gray-700">
                          Price: {item.price} PKR
                        </p>
                      </div>
                      <p className="font-semibold text-2xl text-indigo-500 hover:text-red-400 cursor-pointer ">
                        x
                      </p>
                    </div>
                    <div> 
                      {myCart.reduce((total, v)=> {
                          return total+= v.price
                      }, 0)}
                    </div>
                  </>
                ))
              ) : (
                <p className="text-center text-gray-400">Your cart is empty.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
