import * as types from '~/src/constants/actionTypes/contactActionTypes';
import { API_CALL } from '~/src/middleware/API';

export const createContact = (email, message) => ({
  [API_CALL]: {
    endpoint: '/contacts',
    method: 'POST',
    query: {},
    payload: { contact: { email, message } },
    types: [
      types.CREATE_CONTACT_REQUEST,
      types.CREATE_CONTACT_SUCCESS,
      types.CREATE_CONTACT_ERROR
    ]
  }
});

export const resetContact = () => ({
  type: types.RESET_CONTACT
});
