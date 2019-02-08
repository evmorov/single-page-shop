import { connect } from 'react-redux';

import Product from './Product';

const stateToProps = state => ({
  product: state.product.entry,
  isFetching: state.product.isFetching,
  error: state.product.error
});

export default connect(stateToProps)(Product);
