const express = require("express");

const router = express.Router();
const {
  fetchAllUsers,
  updateUser,
  deleteUser,
  fetchUserByID,
} = require("../controllers/user");

router.get("/fetch", fetchAllUsers);
router.get("/fetch/:id", fetchUserByID);

router.put("/update/:id", updateUser);

router.delete("/delete/:id", deleteUser);

module.exports = router;
