import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Description = ({ title, productPath, children }) => (
  <Card.Content>
    <Card.Header>
      <Link to={productPath}>{title}</Link>
    </Card.Header>

    {children}
  </Card.Content>
);

Description.propTypes = {
  title: PropTypes.node.isRequired,
  productPath: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default Description;
