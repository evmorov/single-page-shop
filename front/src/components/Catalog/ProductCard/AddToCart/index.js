import { connect } from 'react-redux';

import { addToCart } from '~/src/actions/cart';
import AddToCart from './AddToCart';

const actionsToProps = { addToCart };

export default connect(null, actionsToProps)(AddToCart);
