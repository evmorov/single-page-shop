import { combineReducers } from 'redux';

import products from './products';
import product from './product';
import cart from './cart';
import contact from './contact';
import orders from './orders';

export default combineReducers({
  products,
  product,
  cart,
  contact,
  orders
});
