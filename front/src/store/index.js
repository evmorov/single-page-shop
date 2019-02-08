/* eslint no-underscore-dangle: off */

import { createStore, applyMiddleware, compose } from 'redux';

import APIMiddleware from '~/src/middleware/API';
import reducers from '~/src/reducers';
import { loadState, saveState } from '~/src/helpers/persistenceHelper';

const persistedState = loadState();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  persistedState,
  composeEnhancers(
    applyMiddleware(APIMiddleware)
  )
);

store.subscribe(() => (
  saveState({
    cart: store.getState().cart
  })
));

export default store;
