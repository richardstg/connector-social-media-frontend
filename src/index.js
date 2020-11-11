import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";

import App from "./App";
import authReducer from "./store/reducers/auth";
import userReducer from "./store/reducers/user";
import feedReducer from "./store/reducers/feed";
import guestBookReducer from "./store/reducers/guestBook";

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  feed: feedReducer,
  guestBook: guestBookReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  // <React.StrictMode></React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
