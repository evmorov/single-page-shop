const Product = require('../models/product');

const index = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

const create = async (req, res) => {
  const { title, description, price, images } = req.body.product || {};
  const product = await Product.create({ title, description, price, images });
  res.status(201).json(product);
};

const show = async (req, res) => {
  const product = await Product.findById(req.params.id).orFail();
  res.json(product);
};

const update = async (req, res) => {
  const product = await Product.findById(req.params.id).orFail();
  const reqProduct = req.body.product || {};

  product.title = reqProduct.title;
  product.description = reqProduct.description;
  product.price = reqProduct.price;
  product.images = reqProduct.images;
  await product.save();

  res.json(product);
};

const destroy = async (req, res) => {
  const product = await Product.findById(req.params.id).orFail();
  product.remove();
  res.json(product);
};

module.exports = { index, create, show, update, destroy };
