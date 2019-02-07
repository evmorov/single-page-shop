const mongoose = require('mongoose');

const Product = require('../models/product');

class ProductsController {
  async fetchProductByReqId(req, res, next) {
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
  }

  fetchProductParams(req, res, next) {
    const productParams = req.body.product;
    if (!productParams) {
      res.status(400).end();
      return;
    }

    req.productParams = productParams;
    next();
  }

  async index(req, res) {
    const products = await Product.find();
    res.json(products);
  }

  async create(req, res) {
    const { title, description, price, images } = req.productParams;
    let product = null;
    try {
      product = await Product.create({ title, description, price, images });
    } catch (e) {
      res.status(400).end(); // TODO: make a response with all validation errors
      return;
    }
    res.status(201).json(product);
  }

  async show(req, res) {
    res.json(req.product);
  }

  async update(req, res) {
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
  }

  async destroy(req, res) {
    const product = await req.product.remove();
    res.json(product);
  }
}

module.exports = ProductsController;
