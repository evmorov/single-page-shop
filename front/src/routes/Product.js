/* eslint react/display-name: off */
/* eslint react/prop-types: off */

import React from 'react';

import Product from '~/src/components/Product';
import { productPath } from '~/src/helpers/routes';
import { fetchProduct } from '~/src/actions/product';

export default {
  path: productPath(),
  render: ({ match }) => (
    <Product id={match.params.id} />
  ),
  prepareData: (store, query, params) => store.dispatch(fetchProduct(params.id))
};
