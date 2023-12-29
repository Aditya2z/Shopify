const seedAdminUsers = require("./server/seedAdmin");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const auth = require("./server/middlewares/auth");

const usersRouter = require("./server/routes/users");
const productsRouter = require("./server/routes/products");
const adminRouter = require("./server/routes/admin");
const cartRouter = require("./server/routes/cart");

const app = express();

mongoose
  .connect("mongodb://127.0.0.1/e-commerce")
  .then(() => {
    console.log("Connected Successfully to e-commerce, running at port 8080.");
    seedAdminUsers();
  })
  .catch((err) => {
    console.log(err.message);
  });

console.log("check1");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
console.log("check2");

app.use(auth.userInfo);

app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);
app.use("/api/admin", adminRouter);
app.use("/api/cart", cartRouter);

app.use(function (req, res, next) {
  const customError = {
    message: "Not Found",
    status: 404,
  };

  next(customError);
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.json({
    message: err.message,
  });
});

module.exports = app;
