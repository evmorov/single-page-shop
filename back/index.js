const express = require('express');
const mongoose = require('mongoose');

const Product = require('./models/product');

const App = express();
mongoose.connect(
  'mongodb://localhost:27017/express-react-shop',
  { useNewUrlParser: true }
);

App.get('/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

App.listen(3000, () => console.log('The server is started'));
