import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import Image from '~/src/components/shared/Image';
import { productPath } from '~/src/helpers/routes';
import productType from '~/src/propTypes/productType';

import Description from './Description';
import Price from './Price';
import AddToCart from './AddToCart/index';

const handleOnDragStart = (e, product) => {
  e.dataTransfer.setData('text', JSON.stringify(product));
};

const ProductCard = ({ image, product }) => (
  <Card
    draggable
    onDragStart={e => handleOnDragStart(e, product)}
  >
    <Link to={productPath(product.id)}>
      <Image src={image} alt={product.title} />
    </Link>

    <Description title={product.title} productPath={productPath(product.id)}>
      <Price price={product.price} floated='left' />

      <div style={{ marginTop: 10 }} >
        <AddToCart
          floated='right'
          product={product} />
      </div>
    </Description>
  </Card>
);

ProductCard.propTypes = {
  image: PropTypes.string.isRequired,
  product: productType.isRequired
};

export default ProductCard;
