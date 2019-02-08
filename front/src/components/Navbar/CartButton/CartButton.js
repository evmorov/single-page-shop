import React from 'react';
import { Statistic, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const handleOnDragOver = (e) => {
  e.preventDefault();
};

const handleOnDrop = (e, addToCart) => {
  let product = {};
  try {
    product = JSON.parse(e.dataTransfer.getData('text'));
  } catch (ex) {
    return;
  }
  addToCart(product, { quantity: 1 });
};

const CartButton = ({ addToCart, totalQuantity }) => (
  <div
    onDragOver={e => handleOnDragOver(e)}
    onDrop={e => handleOnDrop(e, addToCart)}
  >
    <Statistic size='tiny'>
      <Statistic.Value>
        <Icon name='cart' />
        {totalQuantity}
      </Statistic.Value>
      <Statistic.Label>Cart</Statistic.Label>
    </Statistic>
  </div>
);

CartButton.propTypes = {
  addToCart: PropTypes.func.isRequired,
  totalQuantity: PropTypes.number.isRequired
};

export default CartButton;
