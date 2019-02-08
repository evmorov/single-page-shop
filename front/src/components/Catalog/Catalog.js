import React from 'react';
import { Card, Message } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import PageHeader from '~/src/components/shared/PageHeader';
import productType from '~/src/propTypes/productType';

import ProductCard from './ProductCard';

const Catalog = ({ products, location }) => {
  if (!products.length) return '';

  const locationState = location.state;
  let message;
  if (locationState && locationState.message) {
    message = <Message {...locationState.message} />;
  }

  return (
    <div>
      {message}

      <PageHeader content='Catalog' />

      <Card.Group centered>
        {
          products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              image={product.images[0]} />
          ))
        }
      </Card.Group>
    </div>
  );
};

Catalog.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      message: PropTypes.object
    })
  }).isRequired,
  products: PropTypes.arrayOf(productType).isRequired
};

export default withRouter(Catalog);
