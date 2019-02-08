import Catalog from '~/src/components/Catalog';
import { mainPath } from '~/src/helpers/routes';
import { fetchProducts } from '~/src/actions/products';

export default {
  path: mainPath(),
  component: Catalog,
  exact: true,
  strict: true,
  prepareData: store => store.dispatch(fetchProducts())
};
