const express = require('express');
const mongoose = require('mongoose');

const Product = require('./models/product');

const app = express();
const port = 5001;

mongoose.connect(
  'mongodb://localhost:27017/express-react-shop',
  { useNewUrlParser: true }
);

app.get('/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.get('/products/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});

app.listen(port, () => console.log(`The server has started on port ${port}`));
