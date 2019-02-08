import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Grid, Table, Segment
} from 'semantic-ui-react';
import { Redirect, Link } from 'react-router-dom';

import PageHeader from '~/src/components/shared/PageHeader';
import CartItem from './CartItem';
import { formatCurrency } from '~/src/helpers/currencyHelper';
import { catalogPath, checkoutPath } from '~/src/helpers/routes';
import productType from '~/src/propTypes/productType';

const Cart = ({ products, totalPrice }) => {
  const tableHeader = (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Product</Table.HeaderCell>
        <Table.HeaderCell>Price (1 item)</Table.HeaderCell>
        <Table.HeaderCell>Quantity</Table.HeaderCell>
        <Table.HeaderCell>Price</Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
      </Table.Row>
    </Table.Header>
  );

  return (
    products.length > 0 ? (
      <div>
        <PageHeader content='Cart' />

        <Table basic='very' celled>
          {tableHeader}
          <Table.Body>
            {products.map(({
              id, title, price, quantity
            }) => <CartItem key={id} id={id} title={title} price={price} quantity={quantity} />)}
          </Table.Body>
        </Table>

        <Segment basic textAlign='right'>
          Total price: {formatCurrency(totalPrice)}
        </Segment>

        <Grid centered columns={3}>
          <Grid.Column>
            <Link to={checkoutPath()}>
              <Button fluid size='large'>
                Proceed to checkout
              </Button>
            </Link>
          </Grid.Column>
        </Grid>
      </div>
    ) : (
      <Redirect to={{
        pathname: catalogPath(),
        state: { message: { header: 'Cart is empty. Add some products!', warning: true } }
      }}/>
    )
  );
};

Cart.propTypes = {
  products: PropTypes.arrayOf(productType).isRequired,
  totalPrice: PropTypes.number.isRequired
};

export default Cart;
