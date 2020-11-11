import * as actionTypes from "./actionsTypes";

/* Actions for getting the guest book messages */

const getGuestBookMessagesStart = () => {
  return {
    type: actionTypes.GET_GUEST_BOOK_MESSAGES_START,
  };
};

const getGuestBookMessagesSuccess = (guestBookMessages) => {
  return {
    type: actionTypes.GET_GUEST_BOOK_MESSAGES_SUCCESS,
    guestBookMessages: guestBookMessages,
  };
};

const getGuestBookMessagesFail = (error) => {
  return {
    type: actionTypes.GET_GUEST_BOOK_MESSAGES_FAIL,
    error: error,
  };
};

export const getGuestBookMessages = (userId, token) => {
  return async (dispatch) => {
    dispatch(getGuestBookMessagesStart());

    let url;

    url = process.env.REACT_APP_BACKEND_URL + `/guest-book-messages/${userId}`;

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

      dispatch(getGuestBookMessagesSuccess(responseData.guestBookMessages));
    } catch (err) {
      dispatch(getGuestBookMessagesFail(err.message));
    }
  };
};

/* Actions for adding a guest book message */

const addGuestBookMessageStart = () => {
  return {
    type: actionTypes.ADD_GUEST_BOOK_MESSAGE_START,
  };
};

const addGuestBookMessageSuccess = (guestBookMessage) => {
  return {
    type: actionTypes.ADD_GUEST_BOOK_MESSAGE_SUCCESS,
    guestBookMessage: guestBookMessage,
  };
};

const addGuestBookMessageFail = (error) => {
  return {
    type: actionTypes.ADD_GUEST_BOOK_MESSAGE_FAIL,
    error: error,
  };
};

export const addGuestBookMessage = (content, senderId, receiverId, token) => {
  return async (dispatch) => {
    dispatch(addGuestBookMessageStart());

    const url =
      process.env.REACT_APP_BACKEND_URL + `/guest-book-messages/${receiverId}`;
    const authData = {
      content,
      senderId,
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

      dispatch(addGuestBookMessageSuccess(responseData.guestBookMessage));
    } catch (err) {
      dispatch(addGuestBookMessageFail(err.message));
    }
  };
};

export const resetAddGuestBookMessageSuccess = () => {
  return {
    type: actionTypes.RESET_ADD_GUEST_BOOK_MESSAGE_SUCCESS,
  };
};

export const deleteGuestBookMessageSuccess = (guestBookMessage) => {
  return {
    type: actionTypes.DELETE_GUEST_BOOK_MESSAGE_SUCCESS,
    guestBookMessage: guestBookMessage,
  };
};

/*-------------------------------------------------*/

export const clearGuestBookError = () => {
  return {
    type: actionTypes.CLEAR_GUEST_BOOK_ERROR,
  };
};

export const resetGuestBook = () => {
  return {
    type: actionTypes.RESET_GUEST_BOOK,
  };
};
