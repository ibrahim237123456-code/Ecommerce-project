// const express = require('express');
// const activeCardForUsers = require('../services/cart.service');
// const validateJWT = require('../middlewares/validateJwt.middleware');
// const Product = require('../models/product.model');
// const router=express.Router();

// router.get('/',validateJWT,async(req,res)=>{
//     const userId =req.user._id;
//     const cart = await activeCardForUsers({userId})
//     res.status(200).send(cart)
// },


// );
// router.post('/items',validateJWT,async(req,res)=>{
//     const userId = req?.user?._id;
//     const{productId,quantity}=req.body;
//     const res= await addItemToCart({userId,productId,quantity})
//         res.status(200).send(res.data)
// });
// router.put('/item',validateJWT,async(req,res)=>{
//     const userId =req?.user?._id;
//     const{productId,quantity}=req.body
//     const response =await updateItemInCart({userId,productId,quantity});
//         res.status(response.statusCode).send(response.data)
// })
// router.delete('/items/:productId',validateJWT,async(req,res)=>{
//     const userId=req?.user?._id;
//     const{productId}=req.params
//     const response= await this.deleteIremInCart({userId,id})
//             res.status(response.statusCode).send(response.data)

// })

// module.exports=router
const express = require('express');
const router = express.Router();
const CartService = require('../services/cart.service');
const authMiddleware = require('../middlewares/auth.middleware');
const validateJwt = require('../middlewares/validateJwt.middleware');

// تطبيق middleware المصادقة على جميع المسارات
router.use(validateJwt);

// الحصول على سلة المستخدم
router.get('/', authMiddleware, async (req, res) => {
  try {
    const result = await CartService.getUserCart(req.user.id);
    res.status(result.statusCode).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
});
router.delete('/',validateJwt,async(req,res)=>{
    const userId= req?.user?._id;
    const response = await CartService.clearCart({userId})
    res.status(response.statusCode).send(response.data)
});

// إضافة منتج إلى السلة
router.post('/items', authMiddleware, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const result = await CartService.addItemToCart({
      userId: req.user.id,
      productId,
      quantity: quantity || 1
    });
    res.status(result.statusCode).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
});

// تحديث كمية منتج في السلة
router.put('/items/:productId', authMiddleware, async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const result = await CartService.updateItemInCart({
      userId: req.user.id,
      productId,
      quantity
    });
    res.status(result.statusCode).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
});

// إزالة منتج من السلة
router.delete('/items/:productId', authMiddleware, async (req, res) => {
  try {
    const { productId } = req.params;
    const result = await CartService.removeItemFromCart({
      userId: req.user.id,
      productId
    });
    res.status(result.statusCode).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
});

// تفريغ السلة
router.delete('/', authMiddleware, async (req, res) => {
  try {
    const result = await CartService.clearCart(req.user.id);
    res.status(result.statusCode).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
});

module.exports = router;
