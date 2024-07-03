const express = require("express");
const { connectMongoDB } = require("./config/connection");
const userRouter = require("./routes/userRoutes");
const logging = require("./middlewares/logging");
const { parseBody, parseJson } = require("./middlewares/parseBody");

const app = express();
const PORT = 3000;

// MongoDB connection
connectMongoDB("mongodb://127.0.0.1:27017/crudYoutube");

// Middleware
app.use(logging);
app.use(parseBody);
app.use(parseJson);

// Routes
app.use("/user", userRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
