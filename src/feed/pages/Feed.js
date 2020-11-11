import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";

import FeedPosts from "../components/FeedPosts";
import LoadingSpinner from "../../shared/components/UI/LoadingSpinner/LoadingSpinner";
import * as actions from "../../store/actions/index";

const Feed = (props) => {
  const {
    token,
    feedPosts,
    authUserId,
    onGetFeedPosts,
    getFeedPostsLoading,
    getFeedPostsError,
    onResetFeed,
  } = props;

  useEffect(() => {
    onGetFeedPosts(authUserId, token, true);

    return () => onResetFeed();
  }, [onGetFeedPosts, onResetFeed, authUserId, token]);

  return (
    <div>
      <Row>
        <Col lg={{ size: 8, offset: 1 }}>
          {feedPosts && <FeedPosts feedPosts={feedPosts} />}
          {getFeedPostsError && <p>{getFeedPostsError}</p>}
        </Col>
      </Row>
      {getFeedPostsLoading && <LoadingSpinner asOverlay />}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    feedPosts: state.feed.feedPosts,
    authUserId: state.auth.userId,
    getFeedPostsError: state.feed.getFeedPostsError,
    getFeedPostsLoading: state.feed.getFeedPostsLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetFeedPosts: (userId, token, following) =>
      dispatch(actions.getFeedPosts(userId, token, following)),
    onClearFeedError: () => dispatch(actions.clearFeedError()),
    onResetFeed: () => dispatch(actions.resetFeed()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
