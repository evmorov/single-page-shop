import React from 'react';
import PropTypes from 'prop-types';

const deleteItem = (e, id, deleteFromCart) => {
  e.preventDefault();
  deleteFromCart(id);
};

const DeleteFromCart = ({ id, deleteFromCart }) => (
  <a href='#' onClick={e => deleteItem(e, id, deleteFromCart)}>Delete</a>
);

DeleteFromCart.propTypes = {
  id: PropTypes.number.isRequired,
  deleteFromCart: PropTypes.func.isRequired
};

export default DeleteFromCart;
