import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";

import * as actions from "../../store/actions/index";
import ErrorModal from "../../shared/components/UI/ErrorModal/ErrorModal";
import LoadingSpinner from "../../shared/components/UI/LoadingSpinner/LoadingSpinner";
import FeedPosts from "../../feed/components/FeedPosts";
import AddGuestBookMessage from "../../guestbook/components/AddGuestBookMessage";
import GuestBookMessages from "../../guestbook/components/GuestBookMessages";
import FollowingList from "../components/FollowingList/FollowingList";
import UserProfile from "../components/UserProfile";

const UnauthorizedUser = (props) => {
  const { userId } = props.match.params;
  const {
    token,
    user,
    authorizedUserId,
    feedPosts,
    onGetUser,
    onGetFeedPosts,
    onResetFeed,
    onClearUserError,
    onResetUser,
    userLoading,
    userError,
    getFeedPostsLoading,
    getFeedPostsError,
    guestBookMessages,
    onGetGuestBookMessages,
    onResetGuestBook,
    addGuestBookMessageError,
    addGuestBookMessageLoading,
    getGuestBookMessagesError,
    onClearGuestBookError,
  } = props;

  useEffect(() => {
    onGetUser(userId, token);
    onGetFeedPosts(userId, token, false);
    onGetGuestBookMessages(userId, token);

    return () => {
      onResetUser();
      onResetFeed();
      onResetGuestBook();
    };
  }, [
    userId,
    onGetUser,
    onGetFeedPosts,
    onGetGuestBookMessages,
    onResetUser,
    onResetFeed,
    onResetGuestBook,
    token,
  ]);

  return (
    <React.Fragment>
      <ErrorModal error={userError} onClear={onClearUserError} />
      <ErrorModal
        error={addGuestBookMessageError}
        onClear={onClearGuestBookError}
      />
      <Row>
        <Col lg={12}>
          {addGuestBookMessageLoading && <LoadingSpinner asOverlay />}
          <AddGuestBookMessage
            boxShadow
            sender={authorizedUserId}
            receiver={userId}
            placeholder="Write your message here..."
          />
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          {userLoading && <LoadingSpinner asOverlay />}
          {user.firstName && user.id !== authorizedUserId && (
            <UserProfile user={user} />
          )}
        </Col>
        <Col lg={6}>
          {guestBookMessages && (
            <GuestBookMessages guestBookMessages={guestBookMessages} />
          )}
          {getGuestBookMessagesError && <p>{getGuestBookMessagesError}</p>}
        </Col>
        <Col lg={6}>
          {getFeedPostsLoading && <LoadingSpinner asOverlay />}
          {feedPosts && <FeedPosts feedPosts={feedPosts} />}
          {getFeedPostsError && <p>{getFeedPostsError}</p>}
        </Col>
        <Col lg={6}>
          {userLoading && <LoadingSpinner asOverlay />}
          {user.firstName && user.id !== authorizedUserId && (
            <FollowingList header="Following" users={user.following} />
          )}
          {user.firstName &&
            user.id !== authorizedUserId &&
            user.following.length < 1 && (
              <p>{user.firstName} does not follow anybody.</p>
            )}
        </Col>
      </Row>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    user: state.user.user,
    authorizedUserId: state.auth.userId,
    feedPosts: state.feed.feedPosts,
    userLoading: state.user.userLoading,
    userError: state.user.userError,
    getFeedPostsLoading: state.user.getFeedPostsLoading,
    getFeedPostsError: state.feed.getFeedPostsError,
    guestBookMessages: state.guestBook.guestBookMessages,
    addGuestBookMessageError: state.guestBook.addGuestBookMessageError,
    getGuestBookMessagesError: state.guestBook.getGuestBookMessagesError,
    addGuestBookMessageLoading: state.guestBook.addGuestBookMessageLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetUser: (userId, token) => dispatch(actions.getUser(userId, token)),
    onClearUserError: () => dispatch(actions.clearUserError()),
    onGetFeedPosts: (userId, token, following) =>
      dispatch(actions.getFeedPosts(userId, token, following)),
    onGetGuestBookMessages: (userId, token) =>
      dispatch(actions.getGuestBookMessages(userId, token)),
    onClearGuestBookError: () => dispatch(actions.clearGuestBookError()),
    onResetUser: () => dispatch(actions.resetUser()),
    onResetFeed: () => dispatch(actions.resetFeed()),
    onResetGuestBook: () => dispatch(actions.resetGuestBook()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UnauthorizedUser);
