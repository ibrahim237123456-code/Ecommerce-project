const express=require('express');
const { getAllProductts } = require('../services/product.service');
const router=express.Router();

const { getProducts, addProduct } =require('../controllers/product.controller.js') ;

router.get('/', getProducts);
router.get('/',async(req,res)=>{
    const products =await getAllProductts();
    res.status(200).send(products);
});
router.post('/', addProduct);

module.exports = router;