const express = require('express');

const catchErrors = require('../utils/async_error_catcher');
const productsController = require('../controllers/products_controller');

const {
  filters: { fetchProductParams, fetchProductByReqId },
  actions: { index, show, create, update, destroy }
} = productsController;
const router = express.Router();

router.route('/')
  .get(catchErrors(index))
  .post(fetchProductParams, catchErrors(create));

router.route('/:id')
  .get(fetchProductByReqId, catchErrors(show))
  .put(fetchProductByReqId, fetchProductParams, catchErrors(update))
  .delete(fetchProductByReqId, catchErrors(destroy));

// eslint-disable-next-line
router.use((error, req, res, next) => {
  if (error.name === 'ValidationError') {
    return res.status(422).json(error);
  }
  console.error(error);
  res.status(500).json(error);
});

module.exports = router;
