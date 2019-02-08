import React from 'react';
import PropTypes from 'prop-types';
import { Image as ImageSem } from 'semantic-ui-react';

const Image = ({ src, alt }) => (
  <ImageSem src={src} alt={alt} />
);

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
};

export default Image;
