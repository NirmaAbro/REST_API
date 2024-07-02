// const express = require("express");
// const fs = require("fs");
// const mongoose = require("mongoose");
// const users = require("./MOCK_DATA.json");

// const app = express();
// const PORT = 3000;

// // MongoDB connection string
// mongoose
//   .connect("mongodb://127.0.0.1:27017/crudYoutube", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("MongoDB connected");
//   })
//   .catch((err) => {
//     console.error("Mongoose error:", err);
//   });

// // Middleware for parsing URL-encoded data and JSON
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// // Define Mongoose schema
// // Adjusted Mongoose schema with automatic ObjectId generation
// const userSchema = new mongoose.Schema({
//   firstname: {
//     type: String,
//     required: true,
//   },
//   lastname: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true, // Ensure emails are unique
//   },
//   gender: {
//     type: String,
//     required: true,
//   },
// }, {
//   // Automatically generate ObjectId (_id) if not provided
//   _id: { type: mongoose.Schema.ObjectId, auto: true }
// });



// // Create Mongoose model
// const User = mongoose.model("User", userSchema);

// app.use((req, res, next) => {
//   console.log("Hello from middleware");
//   next();
// });

// // Route to get all users
// app.get("/users", (req, res) => {
//   res.setHeader("myName", "NirmaAbro");
//   res.setHeader("myAge", "21");
//   console.log("Headers before response:", res.getHeaders());
//   return res.json(users);
// });

// // Route to get a user by ID
// app.get("/api/users/:id", (req, res) => {
//   const id = Number(req.params.id);
//   console.log(`Requested user ID: ${id}`);
//   const user = users.find((u) => u.id === id);
//   console.log(`Found user: ${JSON.stringify(user)}`);
//   if (user) {
//     return res.json(user);
//   } else {
//     return res.status(404).json({ error: "User not found" });
//   }
// });

// // Route to update a user by ID
// app.patch("/api/users/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const body = req.body;
//   console.log(`Updating user with ID ${id}. New data:`, body);

//   const userIndex = users.findIndex((user) => user.id === id);

//   if (userIndex !== -1) {
//     users[userIndex] = {
//       ...users[userIndex],
//       ...body,
//     };

//     fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
//       if (err) {
//         console.error("Error writing to file:", err);
//         return res.status(500).json({ error: "Failed to update user data." });
//       }
//       console.log("Data written to file successfully.");
//       return res.json({ status: "success", updatedUser: users[userIndex] });
//     });
//   } else {
//     return res.status(404).json({ error: `User with ID ${id} not found.` });
//   }
// });

// // Route to delete a user by ID
// // Route to delete all users (for development/testing purposes only)
// app.delete("/api/users", async (req, res) => {
//   try {
//     const result = await User.deleteMany({});
//     console.log(`All users deleted. Count: ${result.deletedCount}`);
//     return res.status(200).json({ msg: "All users have been deleted", count: result.deletedCount });
//   } catch (error) {
//     console.error("Error deleting users:", error);
//     return res.status(500).json({ msg: "Error deleting users", error });
//   }
// });

// // Route to create a new user
// app.post("/api/users", async (req, res) => {
//   try {
//     const { first_name, last_name, email, gender } = req.body;

//     // Check if all required fields are provided
//     if (!first_name || !last_name || !email || !gender) {
//       return res.status(400).json({ msg: "All fields (first_name, last_name, email, gender) are required" });
//     }

//     // Create a new user using Mongoose model
//     const newUser = await User.create({
//       firstname: first_name,
//       lastname: last_name,
//       email,
//       gender,
//     });

//     console.log("User created in POST route", newUser);
//     return res.status(201).json(newUser);
//   } catch (error) {
//     // Handle validation errors
//     if (error.name === 'ValidationError') {
//       const errors = Object.keys(error.errors).map(key => ({
//         field: key,
//         message: error.errors[key].message
//       }));
//       return res.status(400).json({ errors });
//     }

//     // Handle other types of errors
//     console.error("Error creating user:", error);
//     return res.status(500).json({ msg: "Error creating user", error });
//   }
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`App is running on port ${PORT}`);
// });

const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
const users = require("./MOCK_DATA.json");

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
    unique: true, // Ensure unique index on email
  },
  gender: {
    type: String,
    required: true,
  },
});

// Create Mongoose model
const User = mongoose.model("User", userSchema);

app.use((req, res, next) => {
  console.log("Hello from middleware");
  next();
});

// Route to get all users
app.get("/users", (req, res) => {
  res.setHeader("myName", "NirmaAbro");
  res.setHeader("myAge", "21");
  console.log("Headers before response:", res.getHeaders());
  return res.json(users);
});

// Route to get a user by ID
app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  console.log(`Requested user ID: ${id}`);
  const user = users.find((u) => u.id === id);
  console.log(`Found user: ${JSON.stringify(user)}`);
  if (user) {
    return res.json(user);
  } else {
    return res.status(404).json({ error: "User not found" });
  }
});

// Route to update a user by ID
app.patch("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const body = req.body;
  console.log(`Updating user with ID ${id}. New data:`, body);

  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex !== -1) {
    users[userIndex] = {
      ...users[userIndex],
      ...body,
    };

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
      if (err) {
        console.error("Error writing to file:", err);
        return res.status(500).json({ error: "Failed to update user data." });
      }
      console.log("Data written to file successfully.");
      return res.json({ status: "success", updatedUser: users[userIndex] });
    });
  } else {
    return res.status(404).json(`{ error: User with ID ${id} not found. }`);
  }
});

// Route to delete a user by ID
app.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex !== -1) {
    users.splice(userIndex, 1);

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
      if (err) {
        console.error("Error writing to file:", err);
        return res.status(500).json({ error: "Failed to delete user." });
      }
      // console.log(`User with ID ${id} deleted successfully.``);
      return res.json({ status: "success", deletedUserId: id });
    });
  } else {
    return res.status(404).json(`{ error: User with ID ${id} not found. }`);
  }
});

// Route to create a new user
app.post("/api/users", async (req, res) => {
  try {
    const { first_name, last_name, email, gender } = req.body;

    // Check if all required fields are provided
    if (!first_name || !last_name || !email || !gender) {
      return res.status(400).json({
        msg: "All fields (first_name, last_name, email, gender) are required",
      });
    }

    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    // Create a new user using Mongoose model
    const newUser = await User.create({
      firstname: first_name,
      lastname: last_name,
      email,
      gender,
    });

    console.log("User created in POST route", newUser);
    return res.status(201).json(newUser);
  } catch (error) {
    // Handle validation errors
    if (error.name === "ValidationError") {
      const errors = Object.keys(error.errors).map((key) => ({
        field: key,
        message: error.errors[key].message,
      }));
      return res.status(400).json({ errors });
    }

    // Handle other types of errors
    console.error("Error creating user:", error);
    return res.status(500).json({ msg: "Error creating user", error });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});