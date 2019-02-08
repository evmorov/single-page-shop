import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import PageHeader from '~/src/components/shared/PageHeader';
import productType from '~/src/propTypes/productType';
import { orderSuccessPath } from '~/src/helpers/routes';

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = { phone: '' };

    this.handlePhone = this.handlePhone.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handlePhone(e) {
    this.setState({ phone: e.target.value });
  }

  handleSubmit(e) {
    const { createOrder } = this.props;
    const { phone } = this.state;
    e.preventDefault();

    createOrder(phone);
  }

  render() {
    if (!this.props.products.length) return <Redirect to={{ pathname: orderSuccessPath() }} />;

    return (
      <>
      <PageHeader content='Checkout' />

      <form onSubmit={this.handleSubmit}>
        <label>
          Phone:
          <input type="text" value={this.state.phone} onChange={this.handlePhone} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      </>
    );
  }
}

Checkout.propTypes = {
  createOrder: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(productType).isRequired
};

export default Checkout;
