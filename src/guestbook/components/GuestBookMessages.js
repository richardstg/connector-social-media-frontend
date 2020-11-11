import React, { useState } from "react";

import Modal from "../../shared/components/UI/Modal/Modal";
import GuestBookMessage from "./GuestBookMessage";
import classes from "./GuestBookMessages.module.scss";

const GuestBookMessages = (props) => {
  const [showModal, setShowModal] = useState(false);

  const guestBookMessages = props.guestBookMessages.map((guestBookMessage) => (
    <GuestBookMessage
      guestBookMessage={guestBookMessage}
      guestBookMessages={props.guestBookMessages}
    />
  ));

  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <h3>Guest book</h3>
      </header>
      <Modal
        header="Guest Book"
        show={showModal}
        onCancel={() => setShowModal(false)}
      >
        <ul className={classes.messages}>{guestBookMessages}</ul>
      </Modal>
      <ul className={classes.messages}>{guestBookMessages.slice(0, 5)}</ul>
      {guestBookMessages.length > 5 && (
        <a
          href="!#"
          className={classes.link}
          onClick={(event) => {
            event.preventDefault();
            setShowModal(true);
          }}
        >
          Show all
        </a>
      )}
    </div>
  );
};

export default GuestBookMessages;
