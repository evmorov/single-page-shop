import * as types from '~/src/constants/actionTypes/productActionTypes';

const initialState = {
  isFetching: false,
  error: false,
  entry: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_PRODUCT_REQUEST:
      return { ...initialState, isFetching: true };
    case types.FETCH_PRODUCT_ERROR:
      return { ...initialState, error: true };
    case types.FETCH_PRODUCT_SUCCESS:
      return { ...initialState, entry: action.response };
    default:
      return state;
  }
};
