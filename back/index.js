const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Product = require('./models/product');
const config = require('./config');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(config.db, { useNewUrlParser: true });

const fetchProductByReqId = async (req, res, next) => {
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

const fetchProductParams = (req, res, next) => {
  const productParams = req.body.product;
  if (!productParams) {
    res.status(400).end();
    return;
  }

  req.productParams = productParams;
  next();
};

app.route('/products')
  .get(async (req, res) => {
    const products = await Product.find();
    res.json(products);
  })
  .post(fetchProductParams, async (req, res) => {
    const { title, description, price, images } = req.productParams;
    let product = null;
    try {
      product = await Product.create({ title, description, price, images });
    } catch (e) {
      res.status(400).end(); // TODO: make a response with all validation errors
      return;
    }
    res.status(201).json(product);
  });

app.route('/products/:id')
  .get(fetchProductByReqId, async (req, res) => {
    res.json(req.product);
  })
  .put([fetchProductByReqId, fetchProductParams], async (req, res) => {
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
  })
  .delete(fetchProductByReqId, async (req, res) => {
    const product = await req.product.remove();
    res.json(product);
  });

app.listen(config.port, () => (
  console.log(`The server has started on port ${config.port}`)
));

module.exports = app;
