const express = require('express');

const ProductsController = require('../controllers/products_controller');

const router = express.Router();
const productsController = new ProductsController();
const {
  fetchProductByReqId, fetchProductParams, index, show, create, update, destroy
} = productsController;

router.route('/')
  .get(index)
  .post(fetchProductParams, create);

router.route('/:id')
  .get(fetchProductByReqId, show)
  .put([fetchProductByReqId, fetchProductParams], update)
  .delete(fetchProductByReqId, destroy);

module.exports = router;
