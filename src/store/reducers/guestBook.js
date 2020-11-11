import * as actionTypes from "../actions/actionsTypes";

const initialState = {
  guestBookMessages: [],
  getGuestBookMessagesLoading: false,
  getGuestBookMessagesError: null,
  addGuestBookMessageLoading: false,
  addGuestBookMessageError: null,
  addGuestBookMessageSuccess: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    /* Get guest book messages */
    case actionTypes.GET_GUEST_BOOK_MESSAGES_START:
      return {
        ...state,
        getGuestBookMessagesLoading: true,
      };
    case actionTypes.GET_GUEST_BOOK_MESSAGES_SUCCESS:
      return {
        ...state,
        getGuestBookMessagesLoading: false,
        getGuestBookMessagesError: null,
        guestBookMessages: action.guestBookMessages,
      };
    case actionTypes.GET_GUEST_BOOK_MESSAGES_FAIL:
      return {
        ...state,
        getGuestBookMessagesLoading: false,
        getGuestBookMessagesError: action.error,
      };
    /* Add a guest book message */
    case actionTypes.ADD_GUEST_BOOK_MESSAGE_START:
      return {
        ...state,
        addGuestBookMessageLoading: true,
      };
    case actionTypes.ADD_GUEST_BOOK_MESSAGE_SUCCESS:
      return {
        ...state,
        getGuestBookMessagesError: null,
        addGuestBookMessageLoading: false,
        addGuestBookMessageSuccess: true,
        guestBookMessages: [
          action.guestBookMessage,
          ...state.guestBookMessages,
        ],
      };
    case actionTypes.ADD_GUEST_BOOK_MESSAGE_FAIL:
      return {
        ...state,
        addGuestBookMessageLoading: false,
        addGuestBookMessageError: action.error,
      };
    case actionTypes.RESET_ADD_GUEST_BOOK_MESSAGE_SUCCESS:
      return {
        ...state,
        addGuestBookMessageSuccess: false,
      };
    case actionTypes.DELETE_GUEST_BOOK_MESSAGE_SUCCESS:
      return {
        ...state,
        guestBookMessages: state.guestBookMessages.filter(
          (guestBookMessage) =>
            guestBookMessage.id !== action.guestBookMessage.id
        ),
      };
    case actionTypes.CLEAR_GUEST_BOOK_ERROR:
      return {
        ...state,
        getGuestBookMessagesError: null,
        addGuestBookMessageError: null,
      };
    case actionTypes.RESET_GUEST_BOOK:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default reducer;
