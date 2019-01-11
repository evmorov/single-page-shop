const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Product = require('./models/product');

const app = express();
const port = 5001;

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

mongoose.connect(
  'mongodb://localhost:27017/express-react-shop',
  { useNewUrlParser: true }
);

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

app.listen(port, () => console.log(`The server has started on port ${port}`));
