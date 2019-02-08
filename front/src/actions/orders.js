import * as types from '~/src/constants/actionTypes/orderActionTypes';
import { API_CALL } from '~/src/middleware/API';

export const createOrder = phone => ({
  [API_CALL]: {
    endpoint: '/orders',
    method: 'POST',
    query: {},
    payload: { order: { phone } },
    types: [
      types.CREATE_ORDER_REQUEST,
      types.CREATE_ORDER_SUCCESS,
      types.CREATE_ORDER_ERROR
    ]
  }
});
