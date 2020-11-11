import React, { useState } from "react";
import { connect } from "react-redux";

import Modal from "../../shared/components/UI/Modal/Modal";
import UpdateProfileImage from "../components/UpdateProfileImage";
import UpdateProfileInfo from "../components/UpdateProfileInfo";
import classes from "./UserProfile.module.scss";
import ErrorModal from "../../shared/components/UI/ErrorModal/ErrorModal";
import * as actions from "../../store/actions/index";

const UserProfile = (props) => {
  const { user, authUser } = props;

  const [showChangeImage, setShowChangeImage] = useState(false);
  const [showChangeInfo, setShowChangeInfo] = useState(false);

  const updateUserImageSuccessHandler = () => {
    setTimeout(() => {
      setShowChangeImage(false);
    }, 1000);
  };

  const updateUserInfoSuccessHandler = () => {
    setTimeout(() => {
      setShowChangeInfo(false);
    }, 1000);
  };

  const diffYears = (dt2, dt1) => {
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60 * 60 * 24;
    return Math.abs(Math.floor(diff / 365.25));
  };

  const age = diffYears(new Date(), new Date(user.birthDate));

  return (
    <div className={classes.container}>
      <ErrorModal
        error={props.updateUserInfoError}
        onClear={props.onClearUserError}
      />
      <ErrorModal
        error={props.updateUserImageError}
        onClear={props.onClearUserError}
      />
      <Modal
        header="Change image"
        show={showChangeImage}
        onCancel={() => setShowChangeImage(false)}
      >
        <UpdateProfileImage
          onUpdateUserImageSuccess={updateUserImageSuccessHandler}
        />
      </Modal>
      <Modal
        header="Update info"
        show={showChangeInfo}
        onCancel={() => setShowChangeInfo(false)}
      >
        <UpdateProfileInfo
          firstName={user.firstName}
          lastName={user.lastName}
          birthDate={user.birthDate}
          gender={user.gender}
          description={user.description}
          onUpdateUserInfoSuccess={updateUserInfoSuccessHandler}
        />
      </Modal>
      <header className={classes.header}>
        <h3> {authUser ? "My profile" : "Profile"} </h3>
      </header>
      <div className={classes.profile}>
        <div className={classes.imageContainer}>
          <div className={classes.image}>
            <img
              alt=""
              src={
                user.image
                  ? process.env.REACT_APP_ASSET_URL + `/${user.image}`
                  : "https://panostaja.fi/wp-content/uploads/2016/02/placeholder-person.png"
              }
            />
          </div>
          {authUser && (
            <a
              href="!#"
              className={classes.link}
              onClick={(event) => {
                event.preventDefault();
                setShowChangeImage(true);
              }}
            >
              Change image
              <svg
                className={classes.svg}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M512 144v288c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48h88l12.3-32.9c7-18.7 24.9-31.1 44.9-31.1h125.5c20 0 37.9 12.4 44.9 31.1L376 96h88c26.5 0 48 21.5 48 48zM376 288c0-66.2-53.8-120-120-120s-120 53.8-120 120 53.8 120 120 120 120-53.8 120-120zm-32 0c0 48.5-39.5 88-88 88s-88-39.5-88-88 39.5-88 88-88 88 39.5 88 88z" />
              </svg>
            </a>
          )}
        </div>
        <div className={classes.info}>
          <h4>Info</h4>
          <h6 className={classes.name}>
            Name:{" "}
            <span className={classes.infoProperty}>
              {user.firstName} {user.lastName}
            </span>
          </h6>
          <h6 className={classes.age}>
            Age: <span className={classes.infoProperty}>{age} years</span>
          </h6>
          <h6 className={classes.gender}>
            Gender:{" "}
            <span className={classes.infoProperty}>
              {user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}
            </span>
          </h6>
          <h6 className={classes.description}>
            Description:{" "}
            <span className={classes.infoProperty}>{user.description}</span>
          </h6>
        </div>

        {authUser && (
          <a
            href="!#"
            className={classes.link}
            onClick={(event) => {
              event.preventDefault();
              setShowChangeInfo(true);
            }}
          >
            Update info
            <svg
              className={classes.svg}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z" />
            </svg>
          </a>
          /* <a
            href="#"
            className={classes.link}
            onClick={(event) => {
              event.preventDefault();
              // setShowDeleteAccount(true);
              props.onDeleteUser(props.token);
            }}
          >
            <svg
              className={classes.svg}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z" />
            </svg>
            Delete account
          </a> */
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    updateUserInfoError: state.user.updateUserInfoError,
    updateUserImageError: state.user.updateUserImageError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClearUserError: () => dispatch(actions.clearUserError()),
    // onDeleteUser: (token) => dispatch(actions.deleteUser(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
