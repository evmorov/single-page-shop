import Checkout from '~/src/components/Checkout';
import { checkoutPath } from '~/src/helpers/routes';

export default {
  path: checkoutPath(),
  component: Checkout
};
