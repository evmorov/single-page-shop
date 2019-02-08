import { connect } from 'react-redux';


import Catalog from './Catalog';

const stateToProps = state => ({
  products: state.products.entries,
  isFetching: state.products.isFetching,
  error: state.products.error
});

export default connect(stateToProps)(Catalog);
