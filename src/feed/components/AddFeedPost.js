import React, { useState } from "react";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";

import Button from "../../shared/components/Form/Button/Button";
import Form from "../../shared/components/Form/Form";
import ErrorModal from "../../shared/components/UI/ErrorModal/ErrorModal";
import * as actions from "../../store/actions/index";
import classes from "./AddFeedPost.module.scss";
import LoadingSpinner from "../../shared/components/UI/LoadingSpinner/LoadingSpinner";

const AddFeedPost = (props) => {
  const [feedPost, setFeedPost] = useState();

  const changeHandler = (event) => {
    setFeedPost(event.target.value);
  };

  const submitFeedPostHandler = (event) => {
    event.preventDefault();
    if (feedPost) {
      props.onAddFeedPost(feedPost, props.creator, props.token);
      setFeedPost("");
    }
  };

  return (
    <div className={classes.container}>
      <Row>
        <Col>
          <ErrorModal error={props.error} onClear={props.onClearError} />
          <Form onSubmit={submitFeedPostHandler}>
            <textarea
              id="status"
              onChange={changeHandler}
              value={feedPost}
              className={classes.input}
              placeholder="What's on your mind?"
            ></textarea>
            <Button type="submit">Submit</Button>
          </Form>
        </Col>
      </Row>
      {props.addFeedPostLoading && <LoadingSpinner asOverlay />}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    error: state.feed.addFeedPostError,
    addFeedPostLoading: state.feed.addFeedPostLoading,
    creator: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddFeedPost: (content, creator, token) =>
      dispatch(actions.addFeedPost(content, creator, token)),
    onClearError: () => dispatch(actions.clearFeedError()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddFeedPost);
