import { connect } from 'react-redux';

import Cart from './Cart';

const totalPrice = products => (
  products.reduce((total, { price, quantity }) => total + (price * quantity), 0)
);

const stateToProps = state => ({
  products: state.cart.products
});

const mergeProps = (stateProps, dispatchProps, ownProps) => (
  {
    ...stateProps,
    ...ownProps,
    totalPrice: totalPrice(stateProps.products)
  }
);

export default connect(stateToProps, null, mergeProps)(Cart);
