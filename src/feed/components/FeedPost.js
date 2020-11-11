import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../../store/actions/index";
import LoadingSpinner from "../../shared/components/UI/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../../shared/components/UI/ErrorModal/ErrorModal";
import classes from "./FeedPost.module.scss";

const FeedPost = (props) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { feedPost, authUserId, onDeleteFeedPostSuccess, token } = props;

  const submitDeleteFeedPostHandler = async (
    event,
    postId,
    authUserId,
    token
  ) => {
    event.preventDefault();

    setLoading(true);

    const url = process.env.REACT_APP_BACKEND_URL + `/feed-posts/${postId}`;
    const authData = {
      authUserId,
    };

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(authData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      onDeleteFeedPostSuccess(responseData.feedPost);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <li className={classes.feedPost}>
      <ErrorModal error={error} onClear={() => setError(null)} />
      <Link
        to={
          feedPost.creator.id === authUserId
            ? "/profile"
            : `/user/${feedPost.creator.id}`
        }
      >
        <div className={classes.image}>
          <img
            src={
              feedPost.creator.image
                ? process.env.REACT_APP_BACKEND_URL + `/${feedPost.creator.image}`
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
              feedPost.creator.id === authUserId
                ? "/profile"
                : `/user/${feedPost.creator.id}`
            }
          >
            {feedPost.creator.firstName} {feedPost.creator.lastName}
          </Link>
        </p>
        <p className={classes.date}>
          {feedPost.created.slice(0, 10)} {feedPost.created.slice(11, 16)}
        </p>
        <p className={classes.content}>{feedPost.content}</p>
      </div>
      {feedPost.creator.id === authUserId && (
        <div>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <a
              href="!#"
              className={classes.link}
              onClick={(event) => {
                event.preventDefault();
                submitDeleteFeedPostHandler(
                  event,
                  feedPost.id,
                  authUserId,
                  token
                );
              }}
            >
              Delete
              <svg
                className={classes.svg}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z" />
              </svg>
            </a>
          )}
        </div>
      )}
    </li>
  );
};

const mapStateToProps = (state) => {
  return {
    authUserId: state.auth.userId,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteFeedPostSuccess: (postId) =>
      dispatch(actions.deleteFeedPostSuccess(postId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedPost);
