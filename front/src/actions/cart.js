import * as types from '~/src/constants/actionTypes/cartActionTypes';

export const addToCart = (product, { quantity }) => ({
  type: types.ADD_PRODUCT_TO_CART,
  product,
  quantity
});

export const deleteFromCart = id => ({
  type: types.DELETE_PRODUCT_FROM_CART,
  id
});

export const clearCart = () => ({
  type: types.CLEAR_CART
});
