const Product = require('../models/product');

exports.index = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

exports.create = async (req, res) => {
  const { title, description, price, images } = req.productParams;
  let product = null;
  try {
    product = await Product.create({ title, description, price, images });
  } catch (e) {
    res.status(400).end(); // TODO: make a response with all validation errors
    return;
  }
  res.status(201).json(product);
};

exports.show = async (req, res) => {
  res.json(req.product);
};

exports.update = async (req, res) => {
  const { product } = req;
  product.title = req.productParams.title;
  product.description = req.productParams.description;
  product.price = req.productParams.price;
  product.images = req.productParams.images;
  try {
    await product.save();
  } catch (e) {
    res.status(400).end(); // TODO: make a response with all validation errors
    return;
  }
  res.json(product);
};

exports.destroy = async (req, res) => {
  const product = await req.product.remove();
  res.json(product);
};
