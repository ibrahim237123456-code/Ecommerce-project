const Product = require("../models/product.model");

const getAllProductts = async () => {
  return await Product.find();
};
const seedIntialProducts = async() => {
  const products = [
    { title: "jacket 1", image: ".jpg", price: 15, stock: 100 },
    { title: "jacket 2", image: ".jpg", price: 15, stock: 100 },
    { title: "jacket 3", image: ".jpg", price: 15, stock: 100 },
    { title: "t-shrit 1", image: ".jpg", price: 15, stock: 100 },
    { title: "t-shrit 1", image: ".jpg", price: 15, stock: 100 },
    { title: "t-shrit 1", image: ".jpg", price: 15, stock: 100 },
    { title: "t-shrit 1", image: ".jpg", price: 15, stock: 100 },
    { title: "t-shrit 1", image: ".jpg", price: 15, stock: 100 },
    { title: "t-shrit 1", image: ".jpg", price: 15, stock: 100 },
    { title: "t-shrit 1", image: ".jpg", price: 15, stock: 100 },
    { title: "shoes 1", image: ".jpg", price: 15, stock: 100 },
    { title: "shoes 1", image: ".jpg", price: 15, stock: 100 },
    { title: "shoes 1", image: ".jpg", price: 15, stock: 100 },
    { title: "shoes 1", image: ".jpg", price: 15, stock: 100 },
    { title: "shoes 1", image: ".jpg", price: 15, stock: 100 },
    { title: "shoes 1", image: ".jpg", price: 15, stock: 100 },
    { title: "product 1", image: ".jpg", price: 15, stock: 100 },
    { title: "product 1", image: ".jpg", price: 15, stock: 100 },
    { title: "product 1", image: ".jpg", price: 15, stock: 100 },
    { title: "product 1", image: ".jpg", price: 15, stock: 100 },
    { title: "product 1", image: ".jpg", price: 15, stock: 100 },
    { title: "product 1", image: ".jpg", price: 15, stock: 100 },
    { title: "product 1", image: ".jpg", price: 15, stock: 100 },
    { title: "product 1", image: ".jpg", price: 15, stock: 100 },
    { title: "product 1", image: ".jpg", price: 15, stock: 100 },
    { title: "product 1", image: ".jpg", price: 15, stock: 100 },
    { title: "product 1", image: ".jpg", price: 15, stock: 100 },
    { title: "product 1", image: ".jpg", price: 15, stock: 100 },
    { title: "product 1", image: ".jpg", price: 15, stock: 100 },
    { title: "product 1", image: ".jpg", price: 15, stock: 100 },
    { title: "product 1", image: ".jpg", price: 15, stock: 100 },
    { title: "product 1", image: ".jpg", price: 15, stock: 100 },
    { title: "product 1", image: ".jpg", price: 15, stock: 100 },
    { title: "product 1", image: ".jpg", price: 15, stock: 100 },
    { title: "product 1", image: ".jpg", price: 15, stock: 100 },
    { title: "product 1", image: ".jpg", price: 15, stock: 100 },
    { title: "product 1", image: ".jpg", price: 15, stock: 100 },
    { title: "product 1", image: ".jpg", price: 15, stock: 100 },
    { title: "product 1", image: ".jpg", price: 15, stock: 100 },
    { title: "product 1", image: ".jpg", price: 15, stock: 100 },
    { title: "product 1", image: ".jpg", price: 15, stock: 100 },
    { title: "product 1", image: ".jpg", price: 15, stock: 100 },
    { title: "product 1", image: ".jpg", price: 15, stock: 100 },
    { title: "product 1", image: ".jpg", price: 15, stock: 100 },
    { title: "product 1", image: ".jpg", price: 15, stock: 100 },
    { title: "product 1", image: ".jpg", price: 15, stock: 100 },
    { title: "product 1", image: ".jpg", price: 15, stock: 100 },
    { title: "product 1", image: ".jpg", price: 15, stock: 100 },
    { title: "product 1", image: ".jpg", price: 15, stock: 100 },
    { title: "product 1", image: ".jpg", price: 15, stock: 100 },
    { title: "product 1", image: ".jpg", price: 15, stock: 100 },
    { title: "product 1", image: ".jpg", price: 15, stock: 100 },
    { title: "product 1", image: ".jpg", price: 15, stock: 100 },
  ];
  const existingProducts= await getAllProductts();
  if(existingProducts.length==0){
    await Product.insertMany(products)
  }
};
module.exports={getAllProductts,seedIntialProducts}
