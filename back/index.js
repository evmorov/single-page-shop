const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Product = require('./models/product');
const config = require('./config');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(config.db, { useNewUrlParser: true });

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
  .get(async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      res.json(product);
    } catch (e) {
      res.status(404).end();
    }
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
