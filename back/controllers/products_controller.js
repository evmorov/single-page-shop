const mongoose = require('mongoose');

const Product = require('../models/product');

const filters = {};
const actions = {};

filters.fetchProductByReqId = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).end();
    return;
  }

  const product = await Product.findById(req.params.id);
  if (product) {
    req.product = product;
    next();
  } else {
    res.status(404).end();
  }
};

filters.fetchProductParams = (req, res, next) => {
  const productParams = req.body.product;
  if (!productParams) {
    res.status(400).end();
    return;
  }

  req.productParams = productParams;
  next();
};

actions.index = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

actions.create = async (req, res) => {
  const { title, description, price, images } = req.productParams;
  const product = await Product.create({ title, description, price, images });
  res.status(201).json(product);
};

actions.show = async (req, res) => {
  res.json(req.product);
};

actions.update = async (req, res) => {
  const { product } = req;
  product.title = req.productParams.title;
  product.description = req.productParams.description;
  product.price = req.productParams.price;
  product.images = req.productParams.images;
  await product.save();
  res.json(product);
};

actions.destroy = async (req, res) => {
  const product = await req.product.remove();
  res.json(product);
};

module.exports = { filters, actions };
