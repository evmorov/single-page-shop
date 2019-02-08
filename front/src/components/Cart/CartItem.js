import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';

import DeleteFromCart from './DeleteFromCart/index';
import { formatCurrency } from '~/src/helpers/currencyHelper';

const CartItem = ({
  id, title, price, quantity
}) => (
  <Table.Row>
    <Table.Cell>{title}</Table.Cell>
    <Table.Cell>{formatCurrency(price)}</Table.Cell>
    <Table.Cell>{quantity}</Table.Cell>
    <Table.Cell>{formatCurrency(price * quantity)}</Table.Cell>
    <Table.Cell>
      <DeleteFromCart id={id} />
    </Table.Cell>
  </Table.Row>
);

CartItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired
};

export default CartItem;
