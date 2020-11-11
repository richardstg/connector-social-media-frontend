import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import classes from "./UserItem.module.scss";
import * as actions from "../../../store/actions/index";
import LoadingSpinner from "../../../shared/components/UI/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../../../shared/components/UI/ErrorModal/ErrorModal";

const UserItem = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitFollowHandler = async (userId, token, isFollowingUser) => {
    setLoading(true);

    const url = process.env.REACT_APP_BACKEND_URL + `/users/follow/${userId}`;

    try {
      const response = await fetch(url, {
        method: isFollowingUser ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      if (isFollowingUser) {
        props.onUnfollowSuccess(responseData.user);
      } else {
        props.onFollowSuccess(responseData.user);
      }

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <li className={classes.userItem}>
      <ErrorModal error={error} onClear={() => setError(null)} />
      <Link
        to={
          props.user.id === props.authUserId
            ? "/profile"
            : `/user/${props.user.id}`
        }
      >
        <div className={classes.image}>
          <img
            src={
              props.user.image
                ? process.env.REACT_APP_ASSET_URL + `/${props.user.image}`
                : "https://panostaja.fi/wp-content/uploads/2016/02/placeholder-person.png"
            }
            alt="User"
          />
        </div>
      </Link>
      <p className={classes.name}>
        {props.user.firstName} {props.user.lastName}
      </p>
      <div className={classes.button}>
        {props.showButton && (
          <div>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <a
                href="!#"
                className={classes.link}
                onClick={(event) => {
                  event.preventDefault();
                  submitFollowHandler(
                    props.user.id,
                    props.token,
                    props.isFollowingUser
                  );
                }}
              >
                {props.isFollowingUser ? (
                  <React.Fragment>
                    Unfollow
                    <svg
                      className={classes.svg}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                    >
                      <path d="M624 208H432c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h192c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm-400 48c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z" />
                    </svg>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    Follow
                    <svg
                      className={classes.svg}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                    >
                      <path d="M624 208h-64v-64c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v64h-64c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h64v64c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-64h64c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm-400 48c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z" />
                    </svg>
                  </React.Fragment>
                )}
              </a>
            )}
          </div>
        )}
      </div>
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
    onFollowSuccess: (user) => dispatch(actions.followSuccess(user)),
    onUnfollowSuccess: (user) => dispatch(actions.unfollowSuccess(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserItem);
