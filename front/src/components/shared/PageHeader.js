import React from 'react';
import { Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const PageHeader = ({ content }) => (
  <Header as='h2' content={content} style={{ marginBottom: '1em' }} textAlign='center' />
);

PageHeader.propTypes = {
  content: PropTypes.node.isRequired
};

export default PageHeader;
