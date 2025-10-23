// const Cart = require("../models/cart.model");
// const Product = require("../models/product.model");

// const getOrCreateCart = async (userId) => {
//   return (
//     (await Cart.findOne({ userId, status: "active" }).populate("items.product")) ||
//     (await Cart.create({ userId, items: [], totalAmount: 0, status: "active" }))
//   );
// };

// const addItemToCart = async ({ userId, productId, quantity }) => {
//   const product = await Product.findById(productId);
//   if (!product) return { statusCode: 404, data: "Product not found" };

//   const cart = await getOrCreateCart(userId);
//   const item = cart.items.find(i => i.product.toString() === productId);

//   if (item) item.quantity += Number(quantity);
//   else cart.items.push({ product: productId, unitPrice: product.price, quantity });

//   cart.totalAmount = cart.items.reduce((t, i) => t + i.unitPrice * i.quantity, 0);
//   await cart.save();

//   return { statusCode: 200, data: cart };
// };

// const updateItemInCart = async ({ userId, productId, quantity }) => {
//   const cart = await getOrCreateCart(userId);
//   const item = cart.items.find(i => i.product.toString() === productId);
//   if (!item) return { statusCode: 404, data: "Item not found" };

//   item.quantity = Number(quantity);
//   cart.totalAmount = cart.items.reduce((t, i) => t + i.unitPrice * i.quantity, 0);
//   await cart.save();

//   return { statusCode: 200, data: cart };
// };

// const removeItemFromCart = async ({ userId, productId }) => {
//   const cart = await getOrCreateCart(userId);
//   cart.items = cart.items.filter(i => i.product.toString() !== productId);
//   cart.totalAmount = cart.items.reduce((t, i) => t + i.unitPrice * i.quantity, 0);
//   await cart.save();

//   return { statusCode: 200, data: cart };
// };

// const getUserCart = async (userId) => {
//   const cart = await getOrCreateCart(userId);
//   return { statusCode: 200, data: cart };}

// const otherCartItem = cart.items.filter((p)=>p.product.toString()!==productId)
// console.log(otherCartItem)
// let total =otherCartItem.reduce((sum,product)=>{
//   sum+= product.quantity*unitPrice
//   return sum
// },0)
// existsInCart.quantity =quantity
// total+=existsInCart.quantity*existsInCart.unitPrice
// cart.totalAmount=total
// const updateCart = await cart.save()
// return{data:updateCart,statusCode:200}
// const deleteIremInCart=async({userId,productId}:deleteIremInCart)=>{
//   const cart = await activeCartForUser({userId});
//   const existsInCart =cart.items.find(
//     (p)=>p.product.toString()===productId
//   )
//   if(existsInCart){
//     return {data:'item doesnt` exist to cart',statusCode:400}
//   }    const otherCartItem = cart.items.filter((p)=>p.product.toString()!==productId)
// const total =otherCartItem.reduce((sum,product)=>{
//   sum+= product.quantity*unitPrice
//   return sum
// },0)    
// cart.totalAmount=total
// const updateCart = await cart.save()
// return{data:updateCart,statusCode:200}
// };




// module.exports = { addItemToCart, updateItemInCart, removeItemFromCart, getUserCart };

const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

// ثوابت للرموز والحالات
const CART_STATUS = {
  ACTIVE: "active",
  COMPLETED: "completed"
};

const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};

// خدمة إدارة السلة
const CartService = {
  // الحصول على سلة المستخدم أو إنشاء جديدة
  getOrCreateCart: async (userId) => {
    try {
      let cart = await Cart.findOne({ userId, status: CART_STATUS.ACTIVE })
        .populate("items.product");
      
      if (!cart) {
        cart = await Cart.create({ 
          userId, 
          items: [], 
          totalAmount: 0, 
          status: CART_STATUS.ACTIVE 
        });
      }
      
      return cart;
    } catch (error) {
      throw new Error(`فشل في الحصول على السلة: ${error.message}`);
    }
  },

  // إضافة منتج إلى السلة
  addItemToCart: async ({ userId, productId, quantity }) => {
    try {
      const product = await Product.findById(productId);
      if (!product) {
        return { 
          statusCode: HTTP_STATUS.NOT_FOUND, 
          success: false,
          message: "المنتج غير موجود" 
        };
      }

      // التحقق من الكمية المتاحة
      if (product.stock < quantity) {
        return {
          statusCode: HTTP_STATUS.BAD_REQUEST,
          success: false,
          message: `الكمية المطلوبة غير متاحة. المتوفر: ${product.stock}`
        };
      }

      const cart = await CartService.getOrCreateCart(userId);
      const existingItem = cart.items.find(item => 
        item.product._id.toString() === productId
      );

      if (existingItem) {
        existingItem.quantity += Number(quantity);
        
        // التحقق من عدم تجاوز المخزون
        if (existingItem.quantity > product.stock) {
          return {
            statusCode: HTTP_STATUS.BAD_REQUEST,
            success: false,
            message: `الكمية الإجمالية تتجاوز المخزون المتاح`
          };
        }
      } else {
        cart.items.push({
          product: productId,
          unitPrice: product.price,
          quantity: Number(quantity),
          productName: product.name
        });
      }

      // حساب المبلغ الإجمالي
      cart.totalAmount = cart.items.reduce((total, item) => {
        return total + (item.unitPrice * item.quantity);
      }, 0);

      await cart.save();

      return {
        statusCode: HTTP_STATUS.OK,
        success: true,
        data: await cart.populate('items.product'),
        message: "تمت إضافة المنتج إلى السلة بنجاح"
      };

    } catch (error) {
      return {
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        success: false,
        message: `خطأ في إضافة المنتج: ${error.message}`
      };
    }
  },

  // تحديث كمية منتج في السلة
  updateItemInCart: async ({ userId, productId, quantity }) => {
    try {
      if (quantity <= 0) {
        return {
          statusCode: HTTP_STATUS.BAD_REQUEST,
          success: false,
          message: "الكمية يجب أن تكون أكبر من الصفر"
        };
      }

      const cart = await CartService.getOrCreateCart(userId);
      const item = cart.items.find(item => 
        item.product.toString() === productId
      );

      if (!item) {
        return { 
          statusCode: HTTP_STATUS.NOT_FOUND, 
          success: false,
          message: "المنتج غير موجود في السلة" 
        };
      }

      // التحقق من المخزون
      const product = await Product.findById(productId);
      if (quantity > product.stock) {
        return {
          statusCode: HTTP_STATUS.BAD_REQUEST,
          success: false,
          message: `الكمية المطلوبة غير متاحة. المتوفر: ${product.stock}`
        };
      }

      item.quantity = Number(quantity);
      
      // حساب المبلغ الإجمالي
      cart.totalAmount = cart.items.reduce((total, item) => {
        return total + (item.unitPrice * item.quantity);
      }, 0);

      await cart.save();

      return {
        statusCode: HTTP_STATUS.OK,
        success: true,
        data: await cart.populate('items.product'),
        message: "تم تحديث الكمية بنجاح"
      };

    } catch (error) {
      return {
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        success: false,
        message: `خطأ في تحديث المنتج: ${error.message}`
      };
    }
  },

  // إزالة منتج من السلة
  removeItemFromCart: async ({ userId, productId }) => {
    try {
      const cart = await CartService.getOrCreateCart(userId);
      const initialItemCount = cart.items.length;
      
      cart.items = cart.items.filter(item => 
        item.product.toString() !== productId
      );

      if (cart.items.length === initialItemCount) {
        return { 
          statusCode: HTTP_STATUS.NOT_FOUND, 
          success: false,
          message: "المنتج غير موجود في السلة" 
        };
      }

      // حساب المبلغ الإجمالي بعد الإزالة
      cart.totalAmount = cart.items.reduce((total, item) => {
        return total + (item.unitPrice * item.quantity);
      }, 0);

      await cart.save();

      return {
        statusCode: HTTP_STATUS.OK,
        success: true,
        data: await cart.populate('items.product'),
        message: "تم إزالة المنتج من السلة بنجاح"
      };

    } catch (error) {
      return {
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        success: false,
        message: `خطأ في إزالة المنتج: ${error.message}`
      };
    }
  },

  // الحصول على سلة المستخدم
  getUserCart: async (userId) => {
    try {
      const cart = await CartService.getOrCreateCart(userId);
      
      return {
        statusCode: HTTP_STATUS.OK,
        success: true,
        data: await cart.populate('items.product'),
        message: "تم جلب بيانات السلة بنجاح"
      };

    } catch (error) {
      return {
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        success: false,
        message: `خطأ في جلب بيانات السلة: ${error.message}`
      };
    }
  },

  // تفريغ السلة بالكامل
  clearCart: async (userId)=>{
    try {
      const cart=activeCartForUser({userId});
      cart.items = [];
      cart.totalAmount = 0;
      await cart.save();
      const updateCart = await cart.save()
      return {data:updateCart,statusCode:200}

    } catch (error) {
      return {
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        success: false,
        message: `خطأ في تفريغ السلة: ${error.message}`
      };
    }
  },
};



module.exports = CartService;