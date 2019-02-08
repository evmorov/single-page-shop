import * as types from '~/src/constants/actionTypes/productActionTypes';
import { API_CALL } from '~/src/middleware/API';

export const fetchProduct = id => ({
  [API_CALL]: {
    endpoint: `/products/${id}`,
    method: 'GET',
    query: {},
    types: [
      types.FETCH_PRODUCT_REQUEST,
      types.FETCH_PRODUCT_SUCCESS,
      types.FETCH_PRODUCT_ERROR
    ]
  }
});
