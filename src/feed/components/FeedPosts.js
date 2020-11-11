import React, { useState } from "react";
import Modal from "../../shared/components/UI/Modal/Modal";

import FeedPost from "./FeedPost";
import classes from "./FeedPosts.module.scss";

const FeedPosts = (props) => {
  const [showModal, setShowModal] = useState(false);

  const feedPosts = props.feedPosts.map((feedPost) => (
    <FeedPost feedPost={feedPost} />
  ));

  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <h3>Feed</h3>
      </header>
      <Modal
        header="Feed"
        show={showModal}
        onCancel={() => setShowModal(false)}
      >
        <ul className={classes.feedPosts}>{feedPosts}</ul>
      </Modal>
      <ul className={classes.feedPosts}>{feedPosts.slice(0, 5)}</ul>
      {feedPosts.length > 5 && (
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

export default FeedPosts;
