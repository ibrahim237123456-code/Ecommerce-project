const Product =require( '../models/product.model.js')

 const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

 const addProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.status(201).json(newProduct);
};

module.exports = {
  getProducts,
  addProduct
};
