import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';

import { formatCurrency } from '~/src/helpers/currencyHelper';

const Price = ({ price }) => (
  <Card.Description style={{ fontSize: '1.3em' }}>{formatCurrency(price)}</Card.Description>
);

Price.propTypes = {
  price: PropTypes.number.isRequired
};

export default Price;
