const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

// MongoDB connection string
mongoose
  .connect("mongodb://127.0.0.1:27017/crudYoutube", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("Mongoose error:", err);
  });

// Middleware for parsing URL-encoded data and JSON
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Define Mongoose schema
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
  },
});

// Create Mongoose model
const User = mongoose.model("User", userSchema);

// Route to get all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ msg: "Error fetching users", error });
  }
});

// Route to get a user by ID
app.get("/api/users/:id", async (req, res) => {
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
});

// Route to create a new user
app.post("/api/users", async (req, res) => {
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
});

// Route to update a user by ID
app.patch("/api/users/:id", async (req, res) => {
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
});

// Route to delete a user by ID
app.delete("/api/users/:id", async (req, res) => {
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
});

// Start the server
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
