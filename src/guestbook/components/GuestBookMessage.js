import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import classes from "./GuestBookMessage.module.scss";
import * as actions from "../../store/actions/index";
import LoadingSpinner from "../../shared/components/UI/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../../shared/components/UI/ErrorModal/ErrorModal";
import AddGuestBookMessage from "../../guestbook/components/AddGuestBookMessage";
import Modal from "../../shared/components/UI/Modal/Modal";

const GuestBookMessage = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAnswerModal, setShowAnswerModal] = useState(false);

  const {
    guestBookMessage,
    authUserId,
    onDeleteGuestBookMessageSuccess,
    token,
    addGuestBookMessageError,
    onClearGuestBookError,
  } = props;

  const deleteHandler = async (event) => {
    event.preventDefault();

    setLoading(true);

    const url =
      process.env.REACT_APP_BACKEND_URL +
      `/guest-book-messages/${guestBookMessage.id}`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      onDeleteGuestBookMessageSuccess(responseData.guestBookMessage);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const clickHandler = (event) => {
    event.preventDefault();
    setShowAnswerModal(true);
  };

  const sendMessageSuccessHandler = () => {
    setTimeout(() => {
      setShowAnswerModal(false);
    }, 1000);
  };

  return (
    <li className={classes.guestBookMessage}>
      <ErrorModal error={error} onClear={() => setError(null)} />
      <ErrorModal
        error={addGuestBookMessageError}
        onClear={onClearGuestBookError}
      />
      {showAnswerModal && (
        <Modal
          header="Answer"
          show={showAnswerModal}
          onCancel={() => setShowAnswerModal(false)}
        >
          <AddGuestBookMessage
            sender={authUserId}
            receiver={guestBookMessage.sender.id}
            placeholder="Write something back..."
            onSendMessageSuccess={sendMessageSuccessHandler}
            showConfirmSent
          />
        </Modal>
      )}

      <Link
        to={
          guestBookMessage.sender.id === authUserId
            ? "/profile"
            : `/user/${guestBookMessage.sender.id}`
        }
      >
        <div className={classes.image}>
          <img
            src={
              guestBookMessage.sender.image
                ? process.env.REACT_APP_ASSET_URL +
                  `/${guestBookMessage.sender.image}`
                : "https://panostaja.fi/wp-content/uploads/2016/02/placeholder-person.png"
            }
            alt="User"
          />
        </div>
      </Link>
      <div className={classes.text}>
        <p className={classes.name}>
          <Link
            to={
              guestBookMessage.sender.id === authUserId
                ? "/profile"
                : `/user/${guestBookMessage.sender.id}`
            }
          >
            {guestBookMessage.sender.firstName}{" "}
            {guestBookMessage.sender.lastName}
          </Link>
        </p>
        <p className={classes.date}>
          {guestBookMessage.created.slice(0, 10)}{" "}
          {guestBookMessage.created.slice(11, 16)}
        </p>
        <p className={classes.content}>{guestBookMessage.content}</p>
      </div>
      <div>
        {(guestBookMessage.sender.id.toString() === authUserId ||
          guestBookMessage.receiver.id.toString() === authUserId) && (
          <div className={classes.delete}>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <a href="!#" className={classes.link} onClick={deleteHandler}>
                Delete
                <svg
                  className={classes.svgTrash}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z" />
                </svg>
              </a>
            )}
          </div>
        )}
        {guestBookMessage.receiver.id === authUserId && (
          <a href="!#" className={classes.link} onClick={clickHandler}>
            Answer
            <svg
              className={classes.svg}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z" />
            </svg>
          </a>
        )}
      </div>
    </li>
  );
};

const mapStateToProps = (state) => {
  return {
    authUserId: state.auth.userId,
    token: state.auth.token,
    addGuestBookMessageError: state.guestBook.addGuestBookMessageError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteGuestBookMessageSuccess: (guestBookMessage) =>
      dispatch(actions.deleteGuestBookMessageSuccess(guestBookMessage)),
    onClearGuestBookError: () => dispatch(actions.clearGuestBookError()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GuestBookMessage);
