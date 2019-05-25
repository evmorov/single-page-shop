import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from 'semantic-ui-react';

import ModalWindow from '~/src/components/shared/ModalWindow';

class ImageWithPreviews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: props.selected || 0,
      showModal: false
    };

    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ showModal: true });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  render() {
    const { images, alt, canOpenModal } = this.props;
    const { selected, showModal } = this.state;

    return (
      <>
      <Image
        fluid
        src={images[selected]}
        alt={alt}
        {...(
          (canOpenModal && !showModal) ? (
            { onClick: () => this.openModal(), style: { cursor: 'pointer' } }
          ) : {}
        )}
      />

      <Card.Group
        itemsPerRow={3}
        style={{ marginTop: 12.5 }}>
        {
          images.map((image, index) => (
            <Card
              image={image}
              key={index}
              {...(selected === index ? { color: 'red' } : {})}
              onClick={() => this.setState({ selected: index })} />
          ))
        }
      </Card.Group>

      <ModalWindow isOpen={showModal} closeModal={this.closeModal}>
        <ImageWithPreviews
          images={images}
          alt={alt}
          selected={selected}
          canOpenModal={false} />
      </ModalWindow>
      </>
    );
  }
}

ImageWithPreviews.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.string
  ).isRequired,
  alt: PropTypes.string.isRequired,
  canOpenModal: PropTypes.bool.isRequired,
  selected: PropTypes.number
};

export default ImageWithPreviews;
