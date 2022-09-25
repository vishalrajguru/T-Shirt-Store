require("dotenv").config();
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const orderRoutes = require("./routes/orders");
const productRoutes = require("./routes/product");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");

const app = express();
//dbconnection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch(() => {
    console.log("DB NOT CONNECTED");
  });
//middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My Routs
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
//Starting a server
const port = 8000;
app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
