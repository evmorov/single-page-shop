import * as types from '~/src/constants/actionTypes/orderActionTypes';

const initialState = {
  isSending: false,
  error: false,
  entry: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_ORDER_REQUEST:
      return { ...initialState, isSending: true };
    case types.CREATE_ORDER_ERROR:
      return { ...initialState, error: true };
    case types.CREATE_ORDER_SUCCESS:
      return { ...initialState, entry: action.response };
    default:
      return state;
  }
};
