import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';

import productType from '~/src/propTypes/productType';

import QuantityInput from './QuantityInput';

class AddToCart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: 1
    };

    this.setQuantity = this.setQuantity.bind(this);
  }

  setQuantity(quantity) {
    this.setState({ quantity });
  }

  render() {
    const { product, addToCart, ...props } = this.props;
    const { quantity } = this.state;

    return (
      <div>
        <Button
          icon
          {...props}
          labelPosition='left'
          onClick={() => addToCart(product, { quantity })}
        >
          <Icon name='cart' />
          Add to Cart
        </Button>

        <QuantityInput
          setQuantity={this.setQuantity}
          quantity={quantity}
          addToCart={addToCart}
          product={product} />
      </div>
    );
  }
}

AddToCart.propTypes = {
  product: productType.isRequired,
  addToCart: PropTypes.func.isRequired
};

export default AddToCart;
