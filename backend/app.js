require("dotenv").config();
require("./db")();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const ApiError = require("./utils/apiError");
const globalError = require("./middleware/globalError");
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cookieParser());
app.use(express.static("../uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

const productsRoutes = require("./routes/product.routes");
const usersRoutes = require("./routes/user.routes");
const orderRoutes = require("./routes/order.routes");
const chartRoutes = require("./routes/chart.routes");
const categoryRoutes = require("./routes/category.routes");
const cloudinary = require("./middleware/cloudinary");
const upload = require("./middleware/upload");
app.use("/api/products", productsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/chart", chartRoutes);
app.use("/api/category", categoryRoutes);
app.post("/api/uploadSingle", upload.single("image"), cloudinary);
app.post("/api/uploadMulti", upload.array("images", 5), cloudinary);

app.all("*", (req, res, next) => {
  next(new ApiError(`can't find this route: ${req.originalUrl}`, 500));
});

app.use(globalError);
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });
require("./socket")(io);
module.exports = { server, io };
