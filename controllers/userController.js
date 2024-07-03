const User = require("../models/user"); // Assuming you have a User model

// Controller function to get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ msg: "Error fetching users", error });
  }
};

// Controller function to get a user by ID
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ msg: "Error fetching user", error });
  }
};

// Controller function to create a new user
const createUser = async (req, res) => {
  try {
    const { firstname, lastname, email, gender } = req.body;

    // Check if all required fields are provided
    if (!firstname || !lastname || !email || !gender) {
      return res.status(400).json({
        msg: "All fields (firstname, lastname, email, gender) are required",
      });
    }

    // Create a new user using Mongoose model
    const newUser = await User.create({ firstname, lastname, email, gender });

    console.log("User created in POST route", newUser);
    return res.status(201).json(newUser);
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.keys(error.errors).map((key) => ({
        field: key,
        message: error.errors[key].message,
      }));
      return res.status(400).json({ errors });
    }
    console.error("Error creating user:", error);
    return res.status(500).json({ msg: "Error creating user", error });
  }
};

// Controller function to update a user by ID
const updateUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    console.log("User updated:", updatedUser);
    return res.json(updatedUser);
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.keys(error.errors).map((key) => ({
        field: key,
        message: error.errors[key].message,
      }));
      return res.status(400).json({ errors });
    }
    console.error("Error updating user:", error);
    return res.status(500).json({ msg: "Error updating user", error });
  }
};

// Controller function to delete a user by ID
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    console.log("User deleted:", deletedUser);
    return res.json({ msg: "User deleted", deletedUser });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ msg: "Error deleting user", error });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
