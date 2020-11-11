import React, { useState } from "react";
import FollowingItem from "./FollowingItem";
import Modal from "../../../shared/components/UI/Modal/Modal";
import classes from "./FollowingList.module.scss";

const FollowingList = (props) => {
  const [showModal, setShowModal] = useState(false);

  const users = props.users.map((user) => <FollowingItem user={user} />);

  const usersModal = props.users.map((user) => (
    <FollowingItem
      modal
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
        header="Following"
        show={showModal}
        onCancel={() => setShowModal(false)}
      >
        <ul className={`${classes.users} ${classes.modal}`}>{usersModal}</ul>
      </Modal>
      <div className={classes.usersWrapper}>
        <ul className={classes.users}>{users.slice(0, 4)}</ul>
      </div>
      {users.length > 4 && (
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

export default FollowingList;
