import * as types from '~/src/constants/actionTypes/productsActionTypes';

const initialState = {
  isFetching: false,
  error: false,
  entries: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_PRODUCTS_REQUEST:
      return { ...initialState, isFetching: true };
    case types.FETCH_PRODUCTS_ERROR:
      return { ...initialState, error: true };
    case types.FETCH_PRODUCTS_SUCCESS:
      return { ...initialState, entries: action.response };
    default:
      return state;
  }
};
