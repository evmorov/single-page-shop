const express = require('express');
const mongoose = require('mongoose');

const Product = require('../models/product');
const productsController = require('../controllers/products_controller');

const router = express.Router();

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

router.route('/')
  .get(productsController.index)
  .post(fetchProductParams, productsController.create);

router.route('/:id')
  .get(fetchProductByReqId, productsController.show)
  .put([fetchProductByReqId, fetchProductParams], productsController.update)
  .delete(fetchProductByReqId, productsController.destroy);

module.exports = router;
