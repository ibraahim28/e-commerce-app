const Order = require("../models/orderModel");



const getOneUsersOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ userId });
    res.status(200).send({ success: true, data: orders });
  } catch (error) {
    res.status(500).send({ success: false, error: error?.message })
  }
}

const getAllOrders = async (req, res) => {
  const orders = await Order.find({});
  res.status(200).send({ success: true, data: orders });
};

const getOrderById = async (req, res) => {
  try {
    const orderID = req.params.id;
    const order = await Order.findById(orderID);
    if (!order) return res.status(404).send({ success: false, error: "Order not found" });
    res.status(200).send({ success: true, data: order });
  } catch (error) {
    res.status(400).send({ success: false, error: error?.message });
  }
};

const createOrder = async (req, res) => {
  const body = req.body;

  const newOrder = await Order.create(body);
  res.status(200).send({ success: true, data: newOrder });
};

const updateOrder = async (req, res) => {
  try {
    const orderID = req.params.id;
    console.log("orderID============", orderID)
    const payload = req.body;
    console.log("payload============", payload)
    const updatedOrder = await Order.findByIdAndUpdate(orderID, payload, {
      new: true,
    });
    console.log("updatedOrder===============", updatedOrder)
    res.status(200).send({
      success: true, data: updatedOrder,
    })
  } catch (error) {
    res.status(400).send({ success: false, error: error?.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const orderID = req.params.id;
    const deletedOrder = await Order.findByIdAndDelete(orderID, { new: true });

    res.status(200).send({ success: true, data: deletedOrder });
  } catch (error) {
    res.status(400).send({ succews: false, error: error?.message });
  }
};

const getRecentOrders = async (req, res) => {
  try {
    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(10)
    console.log("recentOrders", recentOrders);
    res.status(200).send({ success: true, data: recentOrders });
  } catch (error) {
    res.status(500).send({ success: false, error: error?.message });
  }
}

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  getOneUsersOrders,
  getRecentOrders,
};
