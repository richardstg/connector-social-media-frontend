import * as actionTypes from "../actions/actionsTypes";

const initialState = {
  feedPosts: [],
  getFeedPostsLoading: false,
  getFeedPostsError: null,
  addFeedPostLoading: false,
  addFeedPostError: null,
  // deleteFeedPostLoading: false,
  // deleteFeedPostError: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    /* Get feed posts */
    case actionTypes.GET_FEED_POSTS_START:
      return {
        ...state,
        getFeedPostsLoading: true,
      };
    case actionTypes.GET_FEED_POSTS_SUCCESS:
      return {
        ...state,
        getFeedPostsLoading: false,
        getFeedPostsError: null,
        feedPosts: action.feedPosts,
      };
    case actionTypes.GET_FEED_POSTS_FAIL:
      return {
        ...state,
        getFeedPostsLoading: false,
        getFeedPostsError: action.error,
      };
    /* Add a feed post */
    case actionTypes.ADD_FEED_POST_START:
      return {
        ...state,
        addFeedPostLoading: true,
      };
    case actionTypes.ADD_FEED_POST_SUCCESS:
      return {
        ...state,
        getFeedPostsError: null,
        addFeedPostLoading: false,
        feedPosts: [action.feedPost, ...state.feedPosts],
      };
    case actionTypes.ADD_FEED_POST_FAIL:
      return {
        ...state,
        addFeedPostLoading: false,
        addFeedPostError: action.error,
      };
    /* Delete a feed post */
    // case actionTypes.DELETE_FEED_POST_START:
    //   return {
    //     ...state,
    //     deleteFeedPostLoading: true,
    //   };
    case actionTypes.DELETE_FEED_POST_SUCCESS:
      return {
        ...state,
        // feedPostsLoading: false,
        feedPosts: state.feedPosts.filter(
          (feedPost) => feedPost.id !== action.feedPost.id
        ),
      };
    // case actionTypes.DELETE_FEED_POST_FAIL:
    //   return {
    //     ...state,
    //     feedPostsLoading: false,
    //     feedPostsError: action.error,
    //   };

    case actionTypes.CLEAR_FEED_ERROR:
      return {
        ...state,
        getFeedPostsError: null,
        addFeedPostError: null,
      };
    case actionTypes.RESET_FEED:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default reducer;
