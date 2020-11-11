import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Form from "../../shared/components/Form/Form";
import Button from "../../shared/components/Form/Button/Button";
import * as actions from "../../store/actions/index";
import LoadingSpinner from "../../shared/components/UI/LoadingSpinner/LoadingSpinner";
import classes from "./AddGuestBookMessage.module.scss";

const AddGuestBookMessage = (props) => {
  const {
    sendMessageSuccess,
    onSendMessageSuccess,
    onResetSendMessageSuccess,
    showConfirmSent,
  } = props;

  const [guestBookMessage, setGuestBookMessage] = useState();

  const changeHandler = (event) => {
    setGuestBookMessage(event.target.value);
  };

  const submitGuestBookMessageHandler = (event) => {
    event.preventDefault();
    if (guestBookMessage) {
      props.onAddGuestBookMessage(
        guestBookMessage,
        props.sender,
        props.receiver,
        props.token
      );
      setGuestBookMessage("");
    }
  };

  if (sendMessageSuccess && onSendMessageSuccess) {
    onSendMessageSuccess();
  }

  useEffect(() => {
    return () => {
      onResetSendMessageSuccess();
    };
  }, [onResetSendMessageSuccess]);

  return (
    <div
      className={`${classes.container} ${props.boxShadow && classes.boxShadow}`}
    >
      <Form onSubmit={submitGuestBookMessageHandler}>
        {props.addGuestBookMessageLoading && <LoadingSpinner asOverlay />}
        <textarea
          id="status"
          placeholder={props.placeholder}
          onChange={changeHandler}
          value={guestBookMessage}
          className={classes.input}
        ></textarea>
        <Button type="submit" size="small">
          Submit
        </Button>
      </Form>
      {sendMessageSuccess && showConfirmSent && (
        <p className={classes.confirmSent}>Message sent!</p>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    addGuestBookMessageLoading: state.guestBook.addGuestBookMessageLoading,
    addGuestBookMessageError: state.guestBook.addGuestBookMessageError,
    sendMessageSuccess: state.guestBook.addGuestBookMessageSuccess,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddGuestBookMessage: (content, senderId, receiverId, token) =>
      dispatch(
        actions.addGuestBookMessage(content, senderId, receiverId, token)
      ),
    onClearBookError: () => dispatch(actions.clearGuestBookError()),
    onResetSendMessageSuccess: () =>
      dispatch(actions.resetAddGuestBookMessageSuccess()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddGuestBookMessage);
