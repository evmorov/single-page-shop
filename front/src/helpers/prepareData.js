export default (store, state) => {
  const {
    location, query, params, routes
  } = state;

  const prepareDataFns = routes.map(route => route.prepareData).filter(Boolean);

  return prepareDataFns.map(prepareData => prepareData(store, query, params, location));
};
