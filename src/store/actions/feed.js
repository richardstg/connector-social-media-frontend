import * as actionTypes from "./actionsTypes";

/* Actions for getting the feedposts */

const getFeedPostsStart = () => {
  return {
    type: actionTypes.GET_FEED_POSTS_START,
  };
};

const getFeedPostsSuccess = (feedPosts) => {
  return {
    type: actionTypes.GET_FEED_POSTS_SUCCESS,
    feedPosts: feedPosts,
  };
};

const getFeedPostsFail = (error) => {
  return {
    type: actionTypes.GET_FEED_POSTS_FAIL,
    error: error,
  };
};

export const getFeedPosts = (userId, token, following = false) => {
  return async (dispatch) => {
    dispatch(getFeedPostsStart());

    let url;

    url = following
      ? process.env.REACT_APP_BACKEND_URL + `/feed-posts/following/${userId}`
      : process.env.REACT_APP_BACKEND_URL + `/feed-posts/${userId}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      dispatch(getFeedPostsSuccess(responseData.feedPosts));
    } catch (err) {
      dispatch(getFeedPostsFail(err.message));
    }
  };
};

/* Actions for adding a feed post */

const addFeedPostStart = () => {
  return {
    type: actionTypes.ADD_FEED_POST_START,
  };
};

const addFeedPostSuccess = (feedPost) => {
  return {
    type: actionTypes.ADD_FEED_POST_SUCCESS,
    feedPost: feedPost,
  };
};

const addFeedPostFail = (error) => {
  return {
    type: actionTypes.ADD_FEED_POST_FAIL,
    error: error,
  };
};

export const addFeedPost = (content, userId, token) => {
  return async (dispatch) => {
    dispatch(addFeedPostStart());

    const url = process.env.REACT_APP_BACKEND_URL + `/feed-posts/${userId}`;
    const authData = {
      content,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
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

      dispatch(addFeedPostSuccess(responseData.feedPost));
    } catch (err) {
      dispatch(addFeedPostFail(err.message));
    }
  };
};

/* Actions for deleting a feed post */

// const deleteFeedPostStart = () => {
//   return {
//     type: actionTypes.DELETE_FEED_POST_START,
//   };
// };

export const deleteFeedPostSuccess = (feedPost) => {
  return {
    type: actionTypes.DELETE_FEED_POST_SUCCESS,
    feedPost: feedPost,
  };
};

// const deleteFeedPostFail = (error) => {
//   return {
//     type: actionTypes.DELETE_FEED_POST_FAIL,
//     error: error,
//   };
// };

// export const deleteFeedPost = (content, userId) => {
//   return async (dispatch) => {
//     dispatch(deleteFeedPostStart());

//     const url = process.env.REACT_APP_BACKEND_URL + `/feed-posts/${userId}`;
//     const authData = {
//       content,
//     };

//     try {
//       const response = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(authData),
//       });

//       const responseData = await response.json();

//       if (!response.ok) {
//         throw new Error(responseData.message);
//       }

//       dispatch(deleteFeedPostSuccess(responseData.feedPost));
//     } catch (err) {
//       dispatch(deleteFeedPostFail(err.message));
//     }
//   };
// };

/* ------------------------ */

export const clearFeedError = () => {
  return {
    type: actionTypes.CLEAR_FEED_ERROR,
  };
};

export const resetFeed = () => {
  return {
    type: actionTypes.RESET_FEED,
  };
};
