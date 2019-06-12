const express = require('express');

const catchErrors = require('../utils/asyncErrorCatcher');
const productsController = require('../controllers/productsController');

const { index, show, create, update, destroy } = productsController;
const router = express.Router();

router.route('/')
  .get(catchErrors(index))
  .post(catchErrors(create));

router.route('/:id')
  .get(catchErrors(show))
  .put(catchErrors(update))
  .delete(catchErrors(destroy));

// eslint-disable-next-line
router.use((error, req, res, next) => {
  if (error.name === 'ValidationError') {
    res.status(422).json(error);
  }

  if (error.name === 'DocumentNotFoundError') {
    res.status(404).end();
  }

  if (error.path === '_id' && error.name === 'CastError') {
    res.status(404).end();
  }

  res.status(500).json(error);
});

module.exports = router;
