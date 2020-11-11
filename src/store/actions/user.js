import * as actionTypes from "./actionsTypes";
import { logout } from "./auth";

/* Actions to get all users */

const getUsersStart = () => {
  return {
    type: actionTypes.GET_USERS_START,
  };
};

const getUsersSuccess = (users) => {
  return {
    type: actionTypes.GET_USERS_SUCCESS,
    users: users,
  };
};

const getUsersFail = (error) => {
  return {
    type: actionTypes.GET_USERS_FAIL,
    error: error,
  };
};

export const getUsers = (token) => {
  return async (dispatch) => {
    dispatch(getUsersStart());

    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/users",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const responseData = await response.json();
      const users = responseData.users;

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      dispatch(getUsersSuccess(users));
    } catch (err) {
      dispatch(getUsersFail(err.message));
    }
  };
};

/* Actions to get a user */

const getUserStart = () => {
  return {
    type: actionTypes.GET_USER_START,
  };
};

const getUserSuccess = (user) => {
  return {
    type: actionTypes.GET_USER_SUCCESS,
    user: user,
  };
};

const getUserFail = (error) => {
  return {
    type: actionTypes.GET_USER_FAIL,
    error: error,
  };
};

export const getUser = (userId, token) => {
  return async (dispatch) => {
    dispatch(getUserStart());

    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + `/users/${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      const user = responseData.user;

      dispatch(getUserSuccess(user));
    } catch (err) {
      dispatch(getUserFail(err.message));
    }
  };
};

export const clearUserError = () => {
  return {
    type: actionTypes.CLEAR_USER_ERROR,
  };
};

/* Actions to update the authorized user's image */

const updateUserImageStart = () => {
  return {
    type: actionTypes.UPDATE_USER_IMAGE_START,
  };
};

const updateUserImageSuccess = (user) => {
  return {
    type: actionTypes.UPDATE_USER_IMAGE_SUCCESS,
    user: user,
  };
};

const updateUserImageFail = (error) => {
  return {
    type: actionTypes.UPDATE_USER_IMAGE_FAIL,
    error: error,
  };
};

export const updateUserImage = (userId, token, image) => {
  return async (dispatch) => {
    dispatch(updateUserImageStart());

    const url = process.env.REACT_APP_BACKEND_URL + `/users/image/${userId}`;
    const formData = new FormData();

    formData.append("image", image);

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      dispatch(updateUserImageSuccess(responseData.user));
    } catch (err) {
      dispatch(updateUserImageFail(err.message));
    }
  };
};

/* Actions to update the authorized user's info */

const updateUserInfoStart = () => {
  return {
    type: actionTypes.UPDATE_USER_INFO_START,
  };
};

const updateUserInfoSuccess = (user) => {
  return {
    type: actionTypes.UPDATE_USER_INFO_SUCCESS,
    user: user,
  };
};

const updateUserInfoFail = (error) => {
  return {
    type: actionTypes.UPDATE_USER_INFO_FAIL,
    error: error,
  };
};

export const updateUserInfo = (
  userId,
  token,
  firstName,
  lastName,
  birthDate,
  description,
  gender
) => {
  return async (dispatch) => {
    dispatch(updateUserInfoStart());

    const url = process.env.REACT_APP_BACKEND_URL + `/users/info/${userId}`;

    const userData = { firstName, lastName, birthDate, description, gender };

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      dispatch(updateUserInfoSuccess(responseData.user));
    } catch (err) {
      dispatch(updateUserInfoFail(err.message));
    }
  };
};

export const resetUpdateUserSuccess = () => {
  return {
    type: actionTypes.RESET_UPDATE_USER_SUCCESS,
  };
};

export const followSuccess = (user) => {
  return {
    type: actionTypes.FOLLOW_SUCCESS,
    user: user,
  };
};

export const unfollowSuccess = (user) => {
  return {
    type: actionTypes.UNFOLLOW_SUCCESS,
    user: user,
  };
};

/* Delete user */

const deleteUserStart = () => {
  return {
    type: actionTypes.DELETE_USER_START,
  };
};

const deleteUserSuccess = (user) => {
  return {
    type: actionTypes.DELETE_USER_SUCCESS,
    user: user,
  };
};

const deleteUserFail = (error) => {
  return {
    type: actionTypes.DELETE_USER_FAIL,
    error: error,
  };
};

export const deleteUser = (token) => {
  return async (dispatch) => {
    dispatch(deleteUserStart());

    const url = process.env.REACT_APP_BACKEND_URL + `/users`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      dispatch(deleteUserSuccess(responseData.user));
      dispatch(logout());
    } catch (err) {
      dispatch(deleteUserFail(err.message));
    }
  };
};

/* Reset user state */

export const resetUser = () => {
  return {
    type: actionTypes.RESET_USER,
  };
};
