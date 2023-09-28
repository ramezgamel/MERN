require("dotenv").config();
require("./db")();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");
const ApiError = require("./utils/apiError");
const globalError = require("./middleware/globalError");
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.static("../uploads"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

const productsRoutes = require("./routes/product.routes");
const usersRoutes = require("./routes/user.routes");
const orderRoutes = require("./routes/order.routes");
const chartRoutes = require("./routes/chart.routes");

app.use("/api/products", productsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/chart", chartRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
}
app.all("*", (req, res, next) => {
  next(new ApiError(`can't find this route: ${req.originalUrl}`, 500));
});

app.use(globalError);
module.exports = app;
