import * as types from '~/src/constants/actionTypes/contactActionTypes';

const initialState = {
  isSending: false,
  error: false,
  contactSent: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_CONTACT_REQUEST:
      return { ...initialState, isSending: true };
    case types.CREATE_CONTACT_ERROR:
      return { ...initialState, error: true };
    case types.CREATE_CONTACT_SUCCESS:
      return { ...initialState, contactSent: true };
    case types.RESET_CONTACT:
      return { ...initialState };
    default:
      return state;
  }
};
