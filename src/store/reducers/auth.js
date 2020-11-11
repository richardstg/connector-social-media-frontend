import * as actionTypes from "../actions/actionsTypes";

const initialState = {
  token: null,
  userId: null,
  loginError: null,
  loginLoading: false,
  signupError: null,
  signupLoading: false,
  authRedirectPath: "/",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_START:
      return {
        ...state,
        loginError: null,
        loginLoading: true,
      };
    case actionTypes.SIGNUP_START:
      return {
        ...state,
        signupError: null,
        signupLoading: true,
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        loginError: null,
        loginLoading: false,
      };
    case actionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        signupError: null,
        signupLoading: false,
      };
    case actionTypes.LOGIN_FAIL:
      return {
        ...state,
        loginError: action.error,
        loginLoading: false,
      };
    case actionTypes.SIGNUP_FAIL:
      return {
        ...state,
        signupError: action.error,
        signupLoading: false,
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        ...initialState,
      };
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return {
        ...state,
        authRedirectPath: action.path,
      };
    case actionTypes.CLEAR_AUTH_ERROR:
      return {
        ...state,
        loginError: null,
        signupError: null,
      };
    default:
      return state;
  }
};

export default reducer;
