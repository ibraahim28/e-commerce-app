const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");

const createUser = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    console.log("Request body:", req.body);
    console.log("Uploaded file:", req.file);

    const profilePicture = req.file ? `/uploads/${req.file.filename}` : null;
    console.log("SAVED PROFILE", profilePicture);


    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      username,
      password: hashedPassword,
      profilePicture,
    });

    const { password: _, ...rest } = user.toObject();
    const token = jwt.sign(
      { data: rest, role: "user" },
      process.env.Secret_Key
    );

    res.send({ success: true, data: rest, userToken: token });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
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
      { data: { id: user._id, email: user.email }, role: "user" },
      process.env.Secret_Key
    );
    res.send({ success: true, rest, userToken: token });
  } catch (error) {
    res.send({ success: false, error: error?.message });
  }
};

const createAdmin = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    console.log("Request body:", req.body);
    console.log("Uploaded file:", req.file);

    const profilePicture = req.file ? `/uploads/${req.file.filename}` : null;
    console.log("SAVED PROFILE", profilePicture);


    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      email,
      username,
      password: hashedPassword,
      profilePicture,
    });

    const { password: _, ...rest } = admin.toObject();
    const token = jwt.sign(
      { data: rest, role: "admin" },
      process.env.Secret_Key
    );

    res.send({ success: true, data: rest, userToken: token });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin)
      return res
        .status(404)
        .send({ success: false, error: "Admin doesn't exist" });
    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword)
      return res
        .status(400)
        .send({ success: false, error: "Invalid credentials" });

    const token = jwt.sign(
      { data: admin, role: "admin" },
      process.env.Secret_Key
    );

    res.send({ success: true, data: admin, userToken: token });
  } catch (error) {
    res.status(500).send({ success: false, error: error?.message });
  }
};

module.exports = { createUser, loginUser, createAdmin, loginAdmin };
