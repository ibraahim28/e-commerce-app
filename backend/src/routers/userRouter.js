const express = require("express");

const router = express.Router();
const {
  getAllUsers,
  loginUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");

router.get("/fetch", (req,res) => {
  
}
);

router.put("/update/:id", (req,res) => {
  
});

router.delete("/delete/:id", (req,res) => {
  
});

module.exports = router;
