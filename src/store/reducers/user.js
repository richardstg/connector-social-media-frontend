import * as actionTypes from "../actions/actionsTypes";

const initialState = {
  users: [],
  user: {
    id: null,
    firstName: null,
    lastName: null,
    birthDate: null,
    gender: null,
    description: null,
    image: null,
    following: [],
    feedPosts: [],
  },
  userLoading: false,
  userError: null,
  updateUserImageLoading: false,
  updateUserImageError: null,
  updateUserImageSuccess: false,
  updateUserInfoLoading: false,
  updateUserInfoError: null,
  updateUserInfoSuccess: false,
  deleteUserLoading: false,
  deleteUserError: null,
  // deleteUserSuccess: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USERS_START:
      return {
        ...state,
        usersLoading: true,
      };
    case actionTypes.GET_USERS_SUCCESS:
      return {
        ...state,
        usersLoading: false,
        users: action.users,
      };
    case actionTypes.GET_USERS_FAIL:
      return {
        ...state,
        usersLoading: false,
        usersError: action.error,
      };
    case actionTypes.GET_USER_START:
      return {
        ...state,
        userLoading: true,
      };
    case actionTypes.GET_USER_SUCCESS:
      return {
        ...state,
        userLoading: false,
        user: action.user,
      };
    case actionTypes.GET_USER_FAIL:
      return {
        ...state,
        userLoading: false,
        userError: action.error,
      };

    /* Update user image */
    case actionTypes.UPDATE_USER_IMAGE_START:
      return {
        ...state,
        updateUserImageLoading: true,
      };
    case actionTypes.UPDATE_USER_IMAGE_SUCCESS:
      return {
        ...state,
        updateUserImageLoading: false,
        user: action.user,
        updateUserImageSuccess: true,
      };
    case actionTypes.UPDATE_USER_IMAGE_FAIL:
      return {
        ...state,
        updateUserImageLoading: false,
        updateUserImageError: action.error,
      };

    /* Update user info */
    case actionTypes.UPDATE_USER_INFO_START:
      return {
        ...state,
        updateUserInfoLoading: true,
      };
    case actionTypes.UPDATE_USER_INFO_SUCCESS:
      return {
        ...state,
        updateUserInfoLoading: false,
        user: action.user,
        updateUserInfoSuccess: true,
      };
    case actionTypes.UPDATE_USER_INFO_FAIL:
      return {
        ...state,
        updateUserInfoLoading: false,
        updateUserInfoError: action.error,
      };
    case actionTypes.RESET_UPDATE_USER_SUCCESS:
      return {
        ...state,
        updateUserInfoSuccess: false,
        updateUserImageSuccess: false,
      };

    /* Follow/unfollow */
    case actionTypes.FOLLOW_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          following: [...state.user.following, action.user],
        },
      };
    case actionTypes.UNFOLLOW_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          following: state.user.following.filter(
            (followingUser) => followingUser.id !== action.user.id
          ),
        },
      };

    /* Delete user */
    case actionTypes.DELETE_USER_START:
      return {
        ...state,
        deleteUserLoading: true,
      };
    case actionTypes.DELETE_USER_SUCCESS:
      return {
        ...state,
        deleteUserLoading: false,
        // user: action.user,
        // deleteUserSuccess: true,
      };
    case actionTypes.DELETE_USER_FAIL:
      return {
        ...state,
        deleteUserLoading: false,
        deleteUserError: action.error,
      };

    /* Reset and clear errors */
    case actionTypes.RESET_USER:
      return {
        ...initialState,
      };
    case actionTypes.CLEAR_USER_ERROR:
      return {
        ...state,
        usersError: null,
        userError: null,
        updateUserInfoError: null,
        updateUserImageError: null,
        deleteUserError: null,
      };
    default:
      return state;
  }
};

export default reducer;
