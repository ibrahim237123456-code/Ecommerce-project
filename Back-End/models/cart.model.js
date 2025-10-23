const mongoose = require("mongoose");
const { Schema } = mongoose;
const Product = require("../models/product.model");


const CartStatusEnum = ["active", "completed"];

const cartItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, default: 1 },
  unitPrice: { type: Number, required: true },
});

const cartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [cartItemSchema],
  totalAmount: { type: Number, required: true, default: 0 },
  status: { type: String, enum: CartStatusEnum, default: "active" },
});

// 🔹 يحسب الإجمالي قبل الحفظ
cartSchema.pre("save", function (next) {
  this.totalAmount = this.items.reduce((sum, item) => {
    return sum + item.quantity * item.unitPrice;
  }, 0);
  next();
});

// 🔹  لحساب الإجمالي يدويًا
cartSchema.methods.calculateTotal = function () {
  return this.items.reduce((sum, item) => {
    return sum + item.quantity * item.unitPrice;
  }, 0);
};

// 🔹  لإضافة أو تحديث منتج
cartSchema.methods.addOrUpdateItem = async function (productId, unitPrice, quantity = 1) {
  const existingItem = this.items.find(
    (item) => item.product.toString() === productId.toString()
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    this.items.push({ product: productId, unitPrice, quantity });
  }

  this.totalAmount = this.calculateTotal();
  await this.save();
  return this;
};

// 🔹  لحذف منتج من الكارت
cartSchema.methods.removeItem = async function (productId) {
  this.items = this.items.filter(
    (item) => item.product.toString() !== productId.toString()
  );

  this.totalAmount = this.calculateTotal();
  await this.save();
  return this;
};

// 🔹 Method لمسح الكارت بالكامل
cartSchema.methods.clearCart = async function () {
  this.items = [];
  this.totalAmount = 0;
  await this.save();
  return this;
};

// 🔹  لإنهاء عملية الشراء (Checkout)
cartSchema.methods.checkout = async function () {
  if (this.items.length === 0) {
    throw new Error("الكارت فاضي، مينفعش تعمل checkout 😅");
  }

  this.status = "completed";
  await this.save();
  return this;
};

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;