const express = require('express');

const productsController = require('../controllers/products_controller');

const {
  filters: { fetchProductParams, fetchProductByReqId },
  actions: { index, show, create, update, destroy }
} = productsController;
const router = express.Router();

router.route('/')
  .get(index)
  .post(fetchProductParams, create);

router.route('/:id')
  .get(fetchProductByReqId, show)
  .put([fetchProductByReqId, fetchProductParams], update)
  .delete(fetchProductByReqId, destroy);

module.exports = router;
