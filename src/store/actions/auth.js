import * as actionTypes from "./actionsTypes";

const loginStart = () => {
  return {
    type: actionTypes.LOGIN_START,
  };
};

const signupStart = () => {
  return {
    type: actionTypes.SIGNUP_START,
  };
};

const loginSuccess = (userId, token) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    userId,
    token,
  };
};

const signupSuccess = (userId, token) => {
  return {
    type: actionTypes.SIGNUP_SUCCESS,
    userId,
    token,
  };
};

const loginFail = (error) => {
  return {
    type: actionTypes.LOGIN_FAIL,
    error: error,
  };
};

const signupFail = (error) => {
  return {
    type: actionTypes.SIGNUP_FAIL,
    error: error,
  };
};

export const clearError = () => {
  return {
    type: actionTypes.CLEAR_AUTH_ERROR,
  };
};

export const logout = () => {
  localStorage.removeItem("userId");
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");

  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    dispatch(loginStart());

    const url = process.env.REACT_APP_BACKEND_URL + "/auth/login";
    const authData = {
      email,
      password,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(authData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      const expirationDate = new Date(
        new Date().getTime() + responseData.expiresIn * 1000
      );

      localStorage.setItem("userId", responseData.userId);
      localStorage.setItem("token", responseData.token);
      localStorage.setItem("expirationDate", expirationDate);

      dispatch(loginSuccess(responseData.userId, responseData.token));
      dispatch(checkAuthTimeout(responseData.expiresIn));
    } catch (err) {
      dispatch(loginFail(err.message));
    }
  };
};

export const signup = (
  firstName,
  lastName,
  birthDate,
  gender,
  description,
  email,
  password,
  image
) => {
  return async (dispatch) => {
    dispatch(signupStart());

    const url = process.env.REACT_APP_BACKEND_URL + "/auth/signup";
    const formData = new FormData();

    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("birthDate", birthDate);
    formData.append("gender", gender);
    formData.append("description", description);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("image", image);

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      const expirationDate = new Date(
        new Date().getTime() + responseData.expiresIn * 1000
      );

      localStorage.setItem("userId", responseData.userId);
      localStorage.setItem("token", responseData.token);
      localStorage.setItem("expirationDate", expirationDate);

      dispatch(signupSuccess(responseData.userId, responseData.token));
      dispatch(checkAuthTimeout(responseData.expiresIn));
    } catch (err) {
      dispatch(signupFail(err.message));
    }
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");

    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));

      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId");

        dispatch(loginSuccess(userId, token));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
