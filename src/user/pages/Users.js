import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";

import LoadingSpinner from "../../shared/components/UI/LoadingSpinner/LoadingSpinner";
import * as actions from "../../store/actions/index";
import UserList from "../components//UserList/UserList";

const Users = (props) => {
  const {
    token,
    authorizedUserId,
    authorizedUserFollowing,
    users,
    onGetUsers,
    onGetUser,
    onResetUser,
    error,
    loading,
  } = props;

  useEffect(() => {
    onGetUser(authorizedUserId, token); // Get the info about the authorized user, in order to know which users it follows
    onGetUsers(token);
    return () => {
      onResetUser();
    };
  }, [onGetUsers, onGetUser, onResetUser, token, authorizedUserId]);

  return (
    <div>
      <Row>
        <Col lg={{ size: 8, offset: 1 }}>
          {users && (
            <UserList
              showButton
              authorizedUserFollowing={authorizedUserFollowing}
              users={users.filter((user) => user.id !== authorizedUserId)}
              header="Users"
            />
          )}
          {error && <p>{error}</p>}
        </Col>
      </Row>
      {loading && <LoadingSpinner asOverlay />}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    authorizedUserId: state.auth.userId,
    users: state.user.users,
    authorizedUserFollowing: state.user.user.following,
    loading: state.user.userLoading,
    error: state.user.userError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetUsers: (token) => dispatch(actions.getUsers(token)),
    onGetUser: (userId, token) => dispatch(actions.getUser(userId, token)),
    onResetUser: () => dispatch(actions.resetUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
