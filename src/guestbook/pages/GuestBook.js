import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";

import LoadingSpinner from "../../shared/components/UI/LoadingSpinner/LoadingSpinner";
import * as actions from "../../store/actions/index";
import GuestBookMessages from "../components/GuestBookMessages";

const GuestBook = (props) => {
  const {
    authUserId,
    token,
    getGuestBookMessagesError,
    getGuestBookMessagesLoading,
    guestBookMessages,
    onGetGuestBookMessages,
    onResetGuestBook,
  } = props;

  useEffect(() => {
    onGetGuestBookMessages(authUserId, token);

    return () => {
      onResetGuestBook();
    };
  }, [onGetGuestBookMessages, onResetGuestBook, authUserId, token]);

  return (
    <div>
      <Row>
        <Col lg={{ size: 8, offset: 1 }}>
          {guestBookMessages && (
            <GuestBookMessages
              guestBookMessages={guestBookMessages.filter(
                (guestBookMessage) => guestBookMessage.sender.id !== authUserId
              )}
            />
          )}
          {getGuestBookMessagesError && <p>{getGuestBookMessagesError}</p>}
        </Col>
      </Row>
      {getGuestBookMessagesLoading && <LoadingSpinner asOverlay />}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authUserId: state.auth.userId,
    token: state.auth.token,
    getGuestBookMessagesLoading: state.guestBook.getGuestBookMessagesLoading,
    getGuestBookMessagesError: state.guestBook.getGuestBookMessagesError,
    guestBookMessages: state.guestBook.guestBookMessages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetGuestBookMessages: (receiverId, token) =>
      dispatch(actions.getGuestBookMessages(receiverId, token)),
    onResetGuestBook: () => dispatch(actions.resetGuestBook()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GuestBook);
