import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';

import productType from '~/src/propTypes/productType';

const handleChange = (e, setQuantity) => {
  const quantity = parseInt(e.target.value, 10);
  setQuantity(quantity || 0);
};

const QuantityInput = ({
  quantity,
  setQuantity,
  addToCart,
  product
}) => (
  <Input
    fluid
    placeholder='Quantity...'
    defaultValue={quantity}
    onChange={e => handleChange(e, setQuantity)}
    onKeyPress={e => (e.key === 'Enter') && addToCart(product, { quantity })} />
);

QuantityInput.defaultProps = {
  quantity: 1
};

QuantityInput.propTypes = {
  quantity: PropTypes.number,
  setQuantity: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  product: productType.isRequired
};

export default QuantityInput;
