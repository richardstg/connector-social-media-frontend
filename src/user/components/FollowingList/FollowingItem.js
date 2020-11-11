import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import classes from "./FollowingItem.module.scss";
import * as actions from "../../../store/actions/index";
import LoadingSpinner from "../../../shared/components/UI/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../../../shared/components/UI/ErrorModal/ErrorModal";

const FollowingItem = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitFollowHandler = async (
    // authUserId,
    userId,
    token,
    isFollowingUser
  ) => {
    setLoading(true);

    const url = process.env.REACT_APP_BACKEND_URL + `/users/follow/${userId}`;
    // const authData = {
    //   authUserId,
    // };

    try {
      const response = await fetch(url, {
        method: isFollowingUser ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        // body: JSON.stringify(authData),
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
    <li className={`${classes.followingItem} ${props.modal && classes.modal}`}>
      <ErrorModal error={error} onClear={() => setError(null)} />
      <Link
        to={
          props.user.id === props.authUserId
            ? "/profile"
            : `/user/${props.user.id}`
        }
      >
        <div
          className={classes.image}
          style={{
            backgroundImage: `url(${
              props.user.image
                ? process.env.REACT_APP_ASSET_URL + `/${props.user.image}`
                : "https://panostaja.fi/wp-content/uploads/2016/02/placeholder-person.png"
            })`,
          }}
        ></div>
      </Link>
      <p className={classes.name}>
        <Link
          to={
            props.user.id === props.authUserId
              ? "/profile"
              : `/user/${props.user.id}`
          }
        >
          {props.user.firstName} {props.user.lastName}
        </Link>
      </p>
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
              Unfollow
              <svg
                className={classes.svg}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
              >
                <path d="M624 208H432c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h192c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm-400 48c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z" />
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
    onFollowSuccess: (user) => dispatch(actions.followSuccess(user)),
    onUnfollowSuccess: (user) => dispatch(actions.unfollowSuccess(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FollowingItem);
