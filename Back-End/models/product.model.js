const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String,required:true},
    stock: { type: Number,required:true},
    price: { type: Number ,required:true,default:0},
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
