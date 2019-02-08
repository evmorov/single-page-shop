import { connect } from 'react-redux';

import { addToCart } from '~/src/actions/cart';
import CartButton from './CartButton';

const totalQuantity = products => (
  products.reduce((total, { quantity }) => total + quantity, 0)
);

const stateToProps = state => ({
  totalQuantity: totalQuantity(state.cart.products)
});

const actionsToProps = dispatch => ({
  addToCart: (product, options) => dispatch(addToCart(product, options))
});

export default connect(stateToProps, actionsToProps)(CartButton);
