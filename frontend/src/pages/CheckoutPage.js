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
import axios from "axios";
import { BASE_URL } from "../api/config";
import { getToken, getUserData } from "../utils/auth/auth";

const CheckoutPage = () => {
  const [myCart, setMyCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isLoading } = useSelector((v) => v.counter);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    phone: "",
  });

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
          const quantity = cartItem ? cartItem.quantity : 1; // Default quantity is 1
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

  const createOrder = async () => {
    try {
      const user = getUserData();
      console.log(user);
      const payload = {
        userId: user._id,
        items: myCart.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
          price: item.price,
          total: item.totalPrice,
          size: item.size,
          color: item.color,
        })),
        totalAmount: myCart.reduce((acc, item) => acc + item.totalPrice, 0),
        shippingAddress: formData.address,
        orderDate: new Date(),
      };

      const response = await axios.post(`${BASE_URL}/order/create`, payload, {headers : {Authorization : `Bearer ${getToken()}`}});
       console.log("ORDER CREATED", response.data.data)
       dispatch(updateCounter(0));
      message.success("Your order has been placed, the product is on its way.");
    } catch (error) {
      console.error("Error creating order:", error);
      message.error("Error placing order");
    }
  };

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data
    const { fullName, email, address, phone } = formData;
    if (!fullName || !email || !address || !phone) {
      message.error("Please fill in all the required fields.");
      return; // Prevent form submission if any field is missing
    }

    message.success("Your order has been placed, the product is on its way.");

    // Clear cart data from localStorage
    localStorage.removeItem("cart__data");
    localStorage.removeItem("checkoutQuantity");

    // Reset the cart state
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.address ||
      !formData.phone
    )
      return alert("Please fill in all the fields");
    createOrder();
    localStorage.removeItem("cart__data");
    localStorage.removeItem("checkoutQuantity");
    setMyCart([]);

    // Reset cart count in Redux store
    dispatch(updateCounter(0));
  };

  // Remove from cart function
  

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Checkout Form</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
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
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="John Doe"
                  required
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
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="example@mail.com"
                  required
                />
              </div>

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
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Your shipping address"
                  required
                ></textarea>
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
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Your phone number"
                  required
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
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4 overflow-y-auto max-h-[500px] w-full">
              {loading || isLoading ? (
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
              ) 
              
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage
