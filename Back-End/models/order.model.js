const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Order Item Schema
const OrderItemSchema = new Schema({
  productTitle: { 
    type: String, 
    required: [true, "Product title is required"] 
  },
  productImage: { 
    type: String, 
    required: [true, "Product image is required"] 
  },
  unitPrice: { 
    type: Number, 
    required: [true, "Unit price is required"],
    min: [0, "Unit price cannot be negative"]
  },
  quantity: { 
    type: Number, 
    required: [true, "Quantity is required"],
    min: [1, "Quantity must be at least 1"]
  }
});

// Order Schema
const OrderSchema = new Schema({
  orderItems: {
    type: [OrderItemSchema],
    required: [true, "Order items are required"],
    validate: {
      validator: function(items) {
        return items && items.length > 0;
      },
      message: "Order must have at least one item"
    }
  },
  total: { 
    type: Number, 
    required: [true, "Total amount is required"],
    min: [0, "Total cannot be negative"]
  },
  address: { 
    type: String, 
    required: [true, "Address is required"],
    trim: true
  },
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: "User", 
    required: [true, "User ID is required"] 
  }
}, {
  timestamps: true // يضيف createdAt و updatedAt تلقائياً
});

// Virtual for calculating subtotal (اختياري)
OrderSchema.virtual('subtotal').get(function() {
  return this.orderItems.reduce((total, item) => {
    return total + (item.unitPrice * item.quantity);
  }, 0);
});

// Middleware للتأكد من أن الـ total صحيح (اختياري)
OrderSchema.pre('save', function(next) {
  const subtotal = this.orderItems.reduce((total, item) => {
    return total + (item.unitPrice * item.quantity);
  }, 0);
  
  // يمكنك إضافة حسابات أخرى مثل الضرائب والشحن هنا
  if (this.total !== subtotal) {
    console.warn('Order total does not match calculated subtotal');
  }
  
  next();
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;