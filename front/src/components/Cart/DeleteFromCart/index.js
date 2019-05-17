import { connect } from 'react-redux';

import { deleteFromCart } from '~/src/actions/cart';
import DeleteFromCart from './DeleteFromCart';

const actionsToProps = { deleteFromCart };

export default connect(null, actionsToProps)(DeleteFromCart);
