import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { connect } from "react-redux";

import "./shared/styles/app.scss";
import Layout from "./shared/hoc/layout/Layout";
import Auth from "./auth/pages/Auth";
import UnauthorizedUser from "./user/pages/UnauthorizedUser";
import Users from "./user/pages/Users";
import Feed from "./feed/pages/Feed";
import AuthorizedUser from "./user/pages/AuthorizedUser";
import GuestBook from "./guestbook/pages/GuestBook";
import * as actions from "./store/actions/index";

const App = (props) => {
  const { onAuthCheckState } = props;

  const authorizedRoutes = (
    <Switch>
      <Route path="/" exact component={Auth} />
      <Route path="/user/:userId" component={UnauthorizedUser} />
      <Route path="/users" component={Users} />
      <Route path="/profile" component={AuthorizedUser} />
      <Route path="/feed" component={Feed} />
      <Route path="/guest-book" component={GuestBook} />
      <Redirect to="/profile" />
    </Switch>
  );

  const unauthorizedRoutes = (
    <Switch>
      <Route path="/" exact component={Auth} />
      <Redirect to="/" />
    </Switch>
  );

  useEffect(() => {
    onAuthCheckState();
  }, [onAuthCheckState]);

  return (
    <Router
      onUpdate={() => window.scrollTo(0, 0)}
      // history={createBrowserHistory()}
    >
      <Layout authPage={!props.isLoggedIn}>
        {props.isLoggedIn ? authorizedRoutes : unauthorizedRoutes}
      </Layout>
    </Router>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    isLoggedIn: !!state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthCheckState: () => {
      dispatch(actions.authCheckState());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
