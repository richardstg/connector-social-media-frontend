import React from "react";
import { Container } from "reactstrap";

import classes from "./Layout.module.scss";
import Navbar from "../../components/Navigation/Navigation";

const Layout = (props) => {
  return (
    <div className={classes.layout}>
      <Navbar authPage={props.authPage} />
      <Container>{props.children}</Container>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
