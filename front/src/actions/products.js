import * as types from '~/src/constants/actionTypes/productsActionTypes';
import { API_CALL } from '~/src/middleware/API';

export const fetchProducts = () => ({
  [API_CALL]: {
    endpoint: '/products',
    method: 'GET',
    query: {},
    types: [
      types.FETCH_PRODUCTS_REQUEST,
      types.FETCH_PRODUCTS_SUCCESS,
      types.FETCH_PRODUCTS_ERROR
    ]
  }
});
