import React, { useState } from "react";

import UserItem from "./UserItem";
import Modal from "../../../shared/components/UI/Modal/Modal";
import classes from "./UserList.module.scss";

const UserList = (props) => {
  const [showModal, setShowModal] = useState(false);

  const users = props.users.map((user) => (
    <UserItem
      showButton={props.showButton}
      user={user}
      isFollowingUser={
        props.authorizedUserFollowing &&
        props.authorizedUserFollowing.filter(
          (followingUser) => followingUser.id === user.id
        ).length === 1
      }
    />
  ));

  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <h3>{props.header}</h3>
      </header>
      <Modal
        header="Users"
        show={showModal}
        onCancel={() => setShowModal(false)}
      >
        <ul className={classes.users}>{users}</ul>
      </Modal>
      <ul className={classes.users}>{users.slice(0, 5)}</ul>
      {users.length > 5 && (
        <a
          href="!#"
          className={classes.link}
          onClick={(event) => {
            event.preventDefault();
            setShowModal(true);
          }}
        >
          Show all
        </a>
      )}
    </div>
  );
};

export default UserList;
