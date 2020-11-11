import React from "react";
import { Link } from "react-router-dom";

import classes from "./Button.module.scss";

const Button = (props) => {
  if (props.href) {
    return (
      <a
        className={`${classes.button} ${classes[props.size]} ${
          props.inverse && classes.inverse
        } ${props.pinkInverse && classes.pinkInverse} ${
          props.danger && classes.danger
        }`}
        href={props.href}
      >
        {props.children}
      </a>
    );
  }
  if (props.to) {
    return (
      <Link
        to={props.to}
        exact={props.exact}
        className={`${classes.button} ${classes[props.size]} ${
          props.inverse && classes.inverse
        }  ${props.pinkInverse && classes.pinkInverse} ${
          props.danger && classes.danger
        }`}
      >
        {props.children}
      </Link>
    );
  }
  return (
    <button
      className={`${classes.button} ${classes[props.size]} ${
        classes[props.position]
      } ${props.inverse && classes.inverse}  ${
        props.pinkInverse && classes.pinkInverse
      } ${props.danger && classes.danger}`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
