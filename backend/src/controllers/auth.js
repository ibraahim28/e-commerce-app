const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    body = req.body;
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const user = await User.create({
      ...body,
      password: hashedPassword,
    });
    const {password, ...rest} = user.toObject();
    const token = jwt.sign(rest, process.env.Secret_Key);
    console.log(token)

    res.send({ success: true, data: rest, userToken : token });
  } catch (error) {
    res.send({ success: false, error: error?.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const body = req.body;
    const user = await User.findOne({ email: body.email });
    if (!user) return res.send("User Not found");
    const isMatch = await bcrypt.compare(body.password, user.password);
    if (!isMatch) return res.send("Invalid credentials");
    const { password, ...rest } = user.toObject();
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.Secret_Key
    );
    res.send({ success: true, rest, token });
  } catch (error) {
    res.send({ success: false, error: error?.message });
  }
};

module.exports = { createUser, loginUser };
