import React from "react";

import UserItem from "./UserItem";

const FollowingList = (props) => {
  return (
    <ul>
      {props.users
        .filter(
          (user) => user.id.toString() !== props.authorizedUserId.toString()
        )
        .map((user) => (
          <UserItem
            authorizedUserId={props.authorizedUserId}
            user={user}
            isFollowingUser={props.authorizedUserFollowing.includes(user.id)}
          />
        ))}
    </ul>
  );
};

export default FollowingList;
