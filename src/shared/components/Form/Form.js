import React from "react";

import classes from "./Form.module.scss";

const Form = (props) => {
  return (
    <form onSubmit={props.onSubmit} className={classes.form}>
      {props.children}
    </form>
  );
};

export default Form;
