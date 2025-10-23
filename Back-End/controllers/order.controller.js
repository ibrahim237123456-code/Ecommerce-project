const Order = require("../models/order.model");
const Cart = require("../models/cart.model");

// إنشاء طلب جديد
const createOrder = async (req, res) => {
  try {
    const { userId, items, totalAmount, shippingAddress, paymentMethod } = req.body;

    // التحقق من البيانات المطلوبة
    if (!userId || !items || items.length === 0 || !totalAmount || !shippingAddress) {
      return res.status(400).json({
        success: false,
        message: "جميع الحقول مطلوبة: userId, items, totalAmount, shippingAddress"
      });
    }

    // إنشاء الطلب الجديد
    const newOrder = new Order({
      user: userId,
      items: items,
      totalAmount: totalAmount,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod || "cash",
      status: "pending"
    });

    // حفظ الطلب في قاعدة البيانات
    const savedOrder = await newOrder.save();

    // تفريغ سلة التسوق بعد إنشاء الطلب
    await Cart.findOneAndUpdate(
      { user: userId },
      { items: [], totalPrice: 0 },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "تم إنشاء الطلب بنجاح",
      order: savedOrder
    });

  } catch (error) {
    console.error("خطأ في إنشاء الطلب:", error);
    res.status(500).json({
      success: false,
      message: "حدث خطأ في إنشاء الطلب",
      error: error.message
    });
  }
};

// الحصول على جميع الطلبات (للمسؤول)
const getAllOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    
    let filter = {};
    if (status) {
      filter.status = status;
    }

    const orders = await Order.find(filter)
      .populate("user", "name email")
      .populate("items.product", "name price")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Order.countDocuments(filter);

    res.status(200).json({
      success: true,
      orders: orders,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalOrders: total
    });

  } catch (error) {
    console.error("خطأ في جلب الطلبات:", error);
    res.status(500).json({
      success: false,
      message: "حدث خطأ في جلب الطلبات",
      error: error.message
    });
  }
};

// الحصول على طلبات مستخدم معين
const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const orders = await Order.find({ user: userId })
      .populate("items.product", "name price image")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Order.countDocuments({ user: userId });

    res.status(200).json({
      success: true,
      orders: orders,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalOrders: total
    });

  } catch (error) {
    console.error("خطأ في جلب طلبات المستخدم:", error);
    res.status(500).json({
      success: false,
      message: "حدث خطأ في جلب طلبات المستخدم",
      error: error.message
    });
  }
};

// الحصول على طلب بواسطة ID
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id)
      .populate("user", "name email phone")
      .populate("items.product", "name price image");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "الطلب غير موجود"
      });
    }

    res.status(200).json({
      success: true,
      order: order
    });

  } catch (error) {
    console.error("خطأ في جلب الطلب:", error);
    res.status(500).json({
      success: false,
      message: "حدث خطأ في جلب الطلب",
      error: error.message
    });
  }
};

// تحديث حالة الطلب
const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, trackingNumber } = req.body;

    const validStatuses = ["pending", "confirmed", "shipped", "delivered", "cancelled"];
    
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "حالة الطلب غير صالحة"
      });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { 
        status: status,
        ...(trackingNumber && { trackingNumber: trackingNumber })
      },
      { new: true, runValidators: true }
    ).populate("user", "name email")
     .populate("items.product", "name price");

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "الطلب غير موجود"
      });
    }

    res.status(200).json({
      success: true,
      message: "تم تحديث الطلب بنجاح",
      order: updatedOrder
    });

  } catch (error) {
    console.error("خطأ في تحديث الطلب:", error);
    res.status(500).json({
      success: false,
      message: "حدث خطأ في تحديث الطلب",
      error: error.message
    });
  }
};

// حذف طلب
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({
        success: false,
        message: "الطلب غير موجود"
      });
    }

    res.status(200).json({
      success: true,
      message: "تم حذف الطلب بنجاح"
    });

  } catch (error) {
    console.error("خطأ في حذف الطلب:", error);
    res.status(500).json({
      success: false,
      message: "حدث خطأ في حذف الطلب",
      error: error.message
    });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getUserOrders,
  getOrderById,
  updateOrder,
  deleteOrder
};