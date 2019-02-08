import Contact from '~/src/components/Contact';
import { contactPath } from '~/src/helpers/routes';
import { resetContact } from '~/src/actions/contact';

export default {
  path: contactPath(),
  component: Contact,
  prepareData: store => store.dispatch(resetContact())
};
