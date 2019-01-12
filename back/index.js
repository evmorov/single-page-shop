require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Product = require('./models/product');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

app.route('/products')
  .get(async (req, res) => {
    const products = await Product.find();
    res.json(products);
  })
  .post(async (req, res) => {
    const product = await Product.create(req.body.product);
    res.json(product);
  });

app.route('/products/:id')
  .get(async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.json(product);
  });

app.listen(process.env.SERVER_PORT, () => (
  console.log(`The server has started on port ${process.env.SERVER_PORT}`)
));
