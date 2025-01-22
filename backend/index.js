const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("./config/DB");
const userRouter = require("./src/routers/userRouter");
const authRouter = require("./src/routers/authRouter");
const adminAuthRouter = require("./src/routers/AdminAuthRouter");
const productRouter = require("./src/routers/productRouter");
const orderRouter = require("./src/routers/orderRouter");
const authenticateUser = require("./src/middlewares/authMiddleware");
app.use(cors());
app.use(express.json());

app.use("/", authRouter);
app.use("/admin", adminAuthRouter);
app.use("/user", authenticateUser, userRouter);
app.use("/product", productRouter);
app.use("/order", authenticateUser, orderRouter);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log("App running in port: " + PORT);
});
