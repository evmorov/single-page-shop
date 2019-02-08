import React from 'react';
import { Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const ModalWindow = ({ isOpen, closeModal, children }) => (
  <Modal
    open={isOpen}
    onClose={closeModal}
    size='small'
  >
    <Modal.Content>
      {children}
    </Modal.Content>
  </Modal>
);

ModalWindow.defaultProps = {
  isOpen: false
};

ModalWindow.propTypes = {
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default ModalWindow;
