import React from "react";
import { Modal } from "react-bootstrap";

const AuthModal = ({ show, handleClose, title, children }) => {
  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default AuthModal;
