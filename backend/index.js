const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
require("dotenv").config();
require("./config/DB");
const userRouter = require("./src/routers/userRouter");
const authRouter = require("./src/routers/authRouter");
const adminAuthRouter = require("./src/routers/AdminAuthRouter");
const productRouter = require("./src/routers/productRouter");
const orderRouter = require("./src/routers/orderRouter");
const authenticateUser = require("./src/middlewares/authMiddleware");
app.use(cors({ origin: "https://e-commerce-app-amber-theta.vercel.app" }));
// Optional: Allow other methods if needed
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/", authRouter);
app.use("/admin", adminAuthRouter);
app.use("/user", authenticateUser, userRouter);
app.use("/product", productRouter);
app.use("/order", authenticateUser, orderRouter);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log("App running in port: " + PORT);
});
