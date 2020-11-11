import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";

import LoadingSpinner from "../../shared/components/UI/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../../shared/components/UI/ErrorModal/ErrorModal";
import FeedPosts from "../../feed/components/FeedPosts";
import FollowingList from "../components/FollowingList/FollowingList";
import UserProfile from "../components/UserProfile";
import * as actions from "../../store/actions/index";
import AddFeedPost from "../../feed/components/AddFeedPost";

const AuthorizedUser = (props) => {
  const {
    userId,
    token,
    user,
    following,
    feedPosts,
    onGetUser,
    onGetFeedPosts,
    userLoading,
    userError,
    onClearUserError,
    getFeedPostsLoading,
    getFeedPostsError,
    addFeedPostLoading,
    addFeedPostError,
    onClearFeedError,
    onResetUser,
    onResetFeed,
    onResetGuestBook,
  } = props;

  useEffect(() => {
    onGetUser(userId, token);
    onGetFeedPosts(userId, token, false);

    return () => {
      onResetUser();
      onResetFeed();
      onResetGuestBook();
    };
  }, [
    userId,
    onGetUser,
    onResetUser,
    onResetFeed,
    onGetFeedPosts,
    onResetGuestBook,
    token,
  ]);

  return (
    <div>
      <ErrorModal error={userError} onClear={onClearUserError} />
      <ErrorModal error={addFeedPostError} onClear={onClearFeedError} />
      <Row>
        <Col lg={12}>
          {addFeedPostLoading && <LoadingSpinner asOverlay />}
          <AddFeedPost />
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          {userLoading && <LoadingSpinner asOverlay />}
          {user.firstName && <UserProfile user={user} authUser />}
        </Col>
        <Col lg={6}>
          {feedPosts && <FeedPosts feedPosts={feedPosts} />}
          {getFeedPostsError && <p>{getFeedPostsError}</p>}
          {getFeedPostsLoading && <LoadingSpinner asOverlay />}
        </Col>
        <Col lg={6}>
          {following && (
            <FollowingList
              header="Following"
              showButton
              authorizedUserFollowing={following}
              users={following}
            />
          )}
          {userLoading && <LoadingSpinner asOverlay />}
          {following.length < 1 && <p>You are not following any users.</p>}
        </Col>
      </Row>
      <br />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    token: state.auth.token,
    user: state.user.user,
    following: state.user.user.following,
    feedPosts: state.feed.feedPosts,
    userLoading: state.user.userLoading,
    userError: state.user.userError,
    getFeedPostsLoading: state.feed.getFeedPostsLoading,
    getFeedPostsError: state.feed.getFeedPostsError,
    addFeedPostLoading: state.feed.addFeedPostLoading,
    addFeedPostError: state.feed.addFeedPostError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClearUserError: () => dispatch(actions.clearUserError()),
    onClearFeedError: () => dispatch(actions.clearFeedError()),
    onGetUser: (userId, token) => dispatch(actions.getUser(userId, token)),
    onGetFeedPosts: (userId, token, following) =>
      dispatch(actions.getFeedPosts(userId, token, following)),
    onResetUser: () => dispatch(actions.resetUser()),
    onResetFeed: () => dispatch(actions.resetFeed()),
    onResetGuestBook: () => dispatch(actions.resetGuestBook()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizedUser);
