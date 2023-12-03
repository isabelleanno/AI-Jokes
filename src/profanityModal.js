import Modal from "react-bootstrap/Modal";

export default function ToggleModal() {
  return (
    <Modal className="modal">
      <Modal.Header closeButton>
        <Modal.Title>WhatsApp Contact Info</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column align-items-center">
        <p>Test</p>
      </Modal.Body>
    </Modal>
  );
}
