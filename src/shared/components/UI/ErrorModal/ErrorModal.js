import React from "react";

import Modal from "../Modal/Modal";
import Button from "../../Form/Button/Button";

const ErrorModal = (props) => {
  return (
    <Modal
      center
      onCancel={props.onClear}
      header="An Error Occurred!"
      show={!!props.error}
      footer={<Button onClick={props.onClear}>Okay</Button>}
      className="error"
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
