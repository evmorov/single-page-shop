const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const config = require('./config');
const productsRouter = require('./routes/products');

const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/products', productsRouter);

mongoose.connect(config.db, { useNewUrlParser: true });

app.listen(config.port, () => (
  console.log(`The server has started on port ${config.port}`)
));

module.exports = app;
