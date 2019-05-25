import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import ImageWithPreviews from '~/src/components/shared/ImageWithPreviews';
import PageHeader from '~/src/components/shared/PageHeader';
import NotFound from '~/src/components/NotFound';
import { formatCurrency } from '~/src/helpers/currencyHelper';
import productType from '~/src/propTypes/productType';

const Product = ({ product, error }) => {
  if (error) return <NotFound />;
  if (!product) return '';

  return (
    <div>
      <PageHeader content={product.title} />

      <Grid columns={2} stackable>
        <Grid.Column width={6}>
          <ImageWithPreviews images={product.images} alt={product.title} canOpenModal={true} />
        </Grid.Column>
        <Grid.Column width={10}>
          <Header as='h3' content={formatCurrency(product.price)} />
          <p>{product.description}</p>
        </Grid.Column>
      </Grid>
    </div>
  );
};

Product.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  error: PropTypes.bool.isRequired,
  product: productType
};

export default Product;
