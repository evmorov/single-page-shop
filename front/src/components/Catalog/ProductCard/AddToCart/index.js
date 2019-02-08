import { connect } from 'react-redux';

import { addToCart } from '~/src/actions/cart';
import AddToCart from './AddToCart';

const actionsToProps = dispatch => ({
  addToCart: (product, options) => dispatch(addToCart(product, options))
});

export default connect(null, actionsToProps)(AddToCart);
