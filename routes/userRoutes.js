const express = require("express");
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

// Route to get all users,createUser
router.route("/").get(getAllUsers).post(createUser);

// Route to get a user by ID
router.route("/:id").get(getUserById).patch(updateUser).delete(deleteUser);

module.exports = router;
