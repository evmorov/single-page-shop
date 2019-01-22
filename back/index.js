const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Product = require('./models/product');
const config = require('./config');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(config.db, { useNewUrlParser: true });

const fetchProduct = async (req, res, next) => {
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

app.route('/products')
  .get(async (req, res) => {
    const products = await Product.find();
    res.json(products);
  })
  .post(async (req, res) => {
    const { title, description, price, images } = req.body.product;
    const product = await Product.create({ title, description, price, images });
    res.json(product);
  });

app.route('/products/:id')
  .get(fetchProduct, async (req, res) => {
    res.json(req.product);
  })
  .put(async (req, res) => {
    const { title, description, price, images } = req.body.product;
    try {
      const product = await Product.findByOneAndUpdate(
        { _id: req.params.id },
        { title, description, price, images }
      );
      res.json(product);
    } catch (e) {
      res.status(404).end();
    }
  })
  .delete(async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      res.json(product);
    } catch (e) {
      res.status(404).end();
    }
  });

app.listen(config.port, () => (
  console.log(`The server has started on port ${config.port}`)
));

module.exports = app;
