import React, { useState } from "react";
import { Row, Col } from "reactstrap";

import classes from "./Auth.module.scss";
import Button from "../../shared/components/Form/Button/Button";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import image from "../../shared/assets/images/network.png";
import Logo from "../../shared/components/Logo/Logo";

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const toggleModeHandler = () => {
    setIsLoginMode((prevState) => !prevState);
  };

  return (
    <div className={classes.container}>
      <SignUp show={!isLoginMode} onCancel={toggleModeHandler} />
      <Row>
        <Col lg={{ size: 6, offset: 1 }}>
          <h2>
            <span className={classes.logoText}>
              C
              <div className={classes.logo}>
                <Logo />
              </div>
              NNECTOR
            </span>{" "}
            helps you connect and share with people around you.
          </h2>
          <div className={classes.image}>
            <img src={image} alt="Social" />
          </div>
          <div style={{ fontSize: "9px" }}>
            Icons made by{" "}
            <a
              style={{ fontSize: "9px" }}
              href="http://www.freepik.com/"
              title="Freepik"
            >
              Freepik
            </a>{" "}
            from{" "}
            <a
              style={{ fontSize: "9px" }}
              href="https://www.flaticon.com/"
              title="Flaticon"
            >
              {" "}
              www.flaticon.com
            </a>
          </div>
        </Col>
        <Col lg={4}>
          <Login />
          <hr />
          <Button
            onClick={toggleModeHandler}
            size="big"
            position="center"
            inverse
          >
            Create New Account
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Auth;
