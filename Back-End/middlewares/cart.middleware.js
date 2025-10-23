// cart.middleware.js - طبقة للتحقق من البيانات
const Joi = require('joi');

const cartValidation = {
  // تحقق من بيانات إضافة المنتج
  validateAddItem: (req, res, next) => {
    const schema = Joi.object({
      productId: Joi.string().hex().length(24).required(),
      quantity: Joi.number().integer().min(1).max(1000).required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: `بيانات غير صالحة: ${error.details[0].message}`
      });
    }
    next();
  },

  // تحقق من بيانات تحديث المنتج
  validateUpdateItem: (req, res, next) => {
    const schema = Joi.object({
      quantity: Joi.number().integer().min(0).max(1000).required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: ` Invalid data: ${error.details[0].message}`
      });
    }
    next();
  }
};

module.exports = cartValidation;