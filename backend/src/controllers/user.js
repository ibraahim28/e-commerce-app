const User = require("../models/userModel");

const fetchAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send({ success: true, data: users });
  } catch (error) {
    res.status(400).send({ success: false, error: error?.message });
  }
};

const fetchUserByID = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId)
      return res
        .status(404)
        .send({ success: false, error: "Id is required to find user" });
    const user = await User.findOne({ _id: userId });
    if (!user)
      return res
        .status(404)
        .send({ success: false, error: "User does not exist" });
    res.status(200).send({ success: true, data: user });
  } catch (error) {
    res.status(500).send({ success: false, error: error?.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId)
      return res.status(404).send({ success: false, error: "token not found" });
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    res.status(200).send({ success: false, data: updatedUser });
  } catch (error) {
    res.status(500).send({ message: "Error updating user", error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const {id:userId} = req.params;
    if (!userId)
      return res.status(404).send({ success: false, error: "token not found" });
    const deletedUser = await User.findByIdAndDelete(userId, {new : true});
    res.status(200).send({success : true, data: deletedUser });
  } catch (error) {
    res.status(500).send({ message: "Error deleting user", error });
  }
};

const getUserData = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId)
      return res.status(404).send({ success: false, error: "token not found" });

    const user = await User.findById(userId);
    if (!user)
      return res.status(400).send({ success: false, error: "user not found" });
    res.status(200).send({ success: true, data: user });
  } catch (error) {
    res.status(500).send({ message: "Error fetching user data", error });
  }
};

module.exports = {
  updateUser,
  deleteUser,
  getUserData,
  fetchUserByID,
  fetchAllUsers,
};
