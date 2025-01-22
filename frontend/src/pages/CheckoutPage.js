  import React, { useState, useEffect } from "react";
  import {
    addProductToCart,
    getProductsFromCart,
  } from "../utils/localStorage/index";
  import { updateCounter, updateLoader } from "../redux/reducer";
  import { useDispatch, useSelector } from "react-redux";
  import SkeletonLoader from "../components/loader/Loader";
  import { message } from "antd";
  import { fetchData } from "../utils/data/data";

  const CheckoutPage = () => {
    const [myCart, setMyCart] = useState([]);
    const [loading, setLoading] = useState(true); 
    const { isLoading } = useSelector((v) => v.counter);
    const [formData, setFormData] = useState({fullName : '',})
    const dispatch = useDispatch();

    useEffect(() => {
      
      const getData = async () => {
        try {
          setLoading(true);

         
          const API_DATA = await fetchData();

         
          const cartIds = getProductsFromCart();

          
          const quantityData =
            JSON.parse(localStorage.getItem("checkoutQuantity")) || [];

          
          const filteredCartData = API_DATA.filter((item) =>
            cartIds.includes(item._id)
          );

          const updatedCart = filteredCartData.map((item) => {
            const cartItem = quantityData.find((cart) => cart._id === item._id);
            const quantity = cartItem ? cartItem.quantity : 1; 
            return {
              ...item,
              quantity,
              totalPrice: item.price * quantity, 
            };
          });

          setMyCart(updatedCart);
        } catch (error) {
          console.error("Error fetching Cart Data:", error);
          message.error("Error fetching data");
        } finally {
          setLoading(false);
          dispatch(updateLoader(false));
        }
      };

      getData();
    }, [dispatch]);

    const removefromCart = (params) => {
      const filteredState = myCart.filter((v) => v._id !== params._id);
      setMyCart(filteredState);

      const cartIds = getProductsFromCart();
      const filteredData = cartIds.filter((v) => v !== params._id);
      addProductToCart(filteredData);

      const updatedQuantityData =
        JSON.parse(localStorage.getItem("checkoutQuantity")) || [];
      const updatedQuantity = updatedQuantityData.filter(
        (v) => v._id !== params._id
      );
      localStorage.setItem("checkoutQuantity", JSON.stringify(updatedQuantity));

      dispatch(updateCounter("decrease"));
    };

    const handleSubmit = (e) => {
      e.preventDefault();


    
      message.success("Your order has been placed, the product is on it's way.");

      localStorage.removeItem("cart__data");
      localStorage.removeItem("");

      setMyCart([]);
    };

    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 ">
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
                    required
                  />
                </div>

                {/* Email Field */}
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
                    placeholder="example@mail.com"
                    required
                  />
                </div>

                {/* Address Field */}
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Shipping Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Your shipping address"
                    required
                  ></textarea>
                </div>

                {/* Phone Number Field */}
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
                    placeholder="Your phone number"
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  onClick={(e) => {
                    handleSubmit(e);
                  }}
                  type="submit"
                  className="w-full bg-indigo-500 text-white font-medium rounded-lg py-2 hover:bg-indigo-600"
                >
                  Place Order
                </button>
              </form>
              <div></div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4 overflow-y-auto max-h-[500px] w-full">
                {loading || isLoading ? (
                  <>
                    <>
                      <SkeletonLoader
                        width="90%"
                        height="100px"
                        borderRadius="10px"
                      />
                      <SkeletonLoader
                        width="70%"
                        height="20px"
                        borderRadius="10px"
                      />
                      <SkeletonLoader
                        width="50%"
                        height="20px"
                        borderRadius="10px"
                      />
                    </>
                  </>
                ) : myCart.length > 0 ? (
                  myCart.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 mx-4">
                        <p className="text-lg text-gray-700 font-bold">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-500 line-clamp-3 border-b-2 mb-2 pb-1">
                          {item.description}
                        </p>
                        <div className="flex gap-4 items-center">
                          <p className="text-sm text-gray-700">
                            Price: {item.price} PKR
                          </p>
                          <p className="text-sm text-gray-700">
                            Quantity: {item.quantity}
                          </p>
                          <p className="text-sm text-gray-700">
                            Total Price: {item.totalPrice} PKR
                          </p>
                        </div>
                      </div>
                      <p
                        onClick={() => removefromCart(item)}
                        className="font-semibold text-2xl text-indigo-500 hover:text-red-400 cursor-pointer"
                      >
                        x
                      </p>
                    </div>
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
