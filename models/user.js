const mongoose = require("mongoose");

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

module.exports=User;