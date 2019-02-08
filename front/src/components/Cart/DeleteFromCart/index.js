import { connect } from 'react-redux';

import { deleteFromCart } from '~/src/actions/cart';
import DeleteFromCart from './DeleteFromCart';

const actionsToProps = dispatch => ({
  deleteFromCart: id => dispatch(deleteFromCart(id))
});

export default connect(null, actionsToProps)(DeleteFromCart);
