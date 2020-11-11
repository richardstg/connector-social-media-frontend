import React from "react";
import { CSSTransition } from "react-transition-group";

import Backdrop from "../Backdrop/Backdrop";
import classes from "./Modal.module.scss";
import "./Modal.css";

const ModalOverlay = (props) => {
  return (
    <div
      className={`${classes.modal} ${classes[props.className]} ${
        props.center && classes.center
      }`}
      style={props.style}
    >
      <header
        className={`${classes.modalHeader} ${classes[props.headerClass]}`}
      >
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
        className={classes.form}
      >
        <div
          className={`${classes.modalContent} ${classes[props.contentClass]}`}
        >
          {props.children}
        </div>
        <footer
          className={`${classes.modalFooter} ${classes[props.footerClass]}`}
        >
          {props.footer}
        </footer>
      </form>
    </div>
  );
};

const Modal = (props) => {
  return (
    <React.Fragment>
      <Backdrop
        show={props.show}
        onClick={props.onCancel}
        error={props.className === "error"}
      />
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;
