import { connect } from 'react-redux';

import { createOrder } from '~/src/actions/orders';
import Checkout from './Checkout';

const stateToProps = state => ({
  products: state.cart.products
});

const actionsToProps = { createOrder };

export default connect(stateToProps, actionsToProps)(Checkout);
