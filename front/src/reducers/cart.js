import update from 'immutability-helper';

import * as types from '~/src/constants/actionTypes/cartActionTypes';
import * as orderTypes from '~/src/constants/actionTypes/orderActionTypes';

const initialState = {
  products: []
};

const addProductToCart = (state, action) => {
  const { product, quantity } = action;
  if (quantity < 1) return state;

  const prevProducts = state.products;

  const productIndex = prevProducts.findIndex(p => p.id === product.id);
  let newProducts = [];

  if (productIndex >= 0) {
    const prevQuantity = prevProducts[productIndex].quantity;
    newProducts = update(prevProducts, {
      [productIndex]: { quantity: { $set: prevQuantity + quantity } }
    });
  } else {
    newProducts = [...prevProducts, { ...product, quantity }];
  }

  return { ...state, products: newProducts };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_PRODUCT_TO_CART:
      return addProductToCart(state, action);
    case types.DELETE_PRODUCT_FROM_CART:
      return { ...state, products: state.products.filter(p => p.id !== action.id) };
    case orderTypes.CREATE_ORDER_SUCCESS:
      return { ...state, products: [] };
    default:
      return state;
  }
};
