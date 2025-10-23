const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose"); // مش لازم { default: mongoose }
const cors = require("cors");
dotenv.config();
const app = express();
const port = 3000;
const userRouter = require("./routes/user.route");
const { seedIntialProducts } = require("./services/product.service");
const productRouter = require("./routes/product.route");
const Cart = require("./models/cart.model");
const cartRouter = require("./routes/cart.route");
const orderRoutes = require("./routes/order.routes");
const testimonialRoutes = require("./routes/testimonial");
const faqRoutes = require('./routes/faq.routes');

mongoose
  .connect("mongodb://localhost:27017/E-commerce")
  .then(() => {
    console.log("MongoDB connected successfully ✅");
  })
  .catch((err) => {
    console.log("Failed to connect ❌ " + err);
  });
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "welcome to my store",
    version: "1.0.0",
  });
});
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "المسار غير موجود",
    requestedUrl: req.originalUrl,
  });
});

app.use((error, req, res, next) => {
  console.error("🔥 Error:", error);
  res.status(500).json({
    success: false,
    message: "servver error  ",
    error: process.env.NODE_ENV === "development" ? error.message : undefined,
  });
});
app.use('/api/testimonials', testimonialRoutes);


seedIntialProducts();
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRoutes);
app.use('/api/faqs', faqRoutes);

app.listen(port, () => {
  console.log(`Server is running at: http://localhost:${port}`);
});
