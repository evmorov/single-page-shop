import Catalog from '~/src/components/Catalog';
import { catalogPath } from '~/src/helpers/routes';
import { fetchProducts } from '~/src/actions/products';

export default {
  path: catalogPath(),
  component: Catalog,
  exact: true,
  prepareData: store => store.dispatch(fetchProducts())
};
