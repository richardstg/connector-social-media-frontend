import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import classes from "./Login.module.scss";
import Button from "../../shared/components/Form/Button/Button";
import Input from "../../shared/components/Form/Input/Input";
import Form from "../../shared/components/Form/Form";
import LoadingSpinner from "../../shared/components/UI/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../../shared/components/UI/ErrorModal/ErrorModal";
import { useForm } from "../../shared/hooks/form-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import * as actions from "../../store/actions/index";

const Login = (props) => {
  const [formState, inputHandler] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const submitLogInHandler = (event) => {
    event.preventDefault();
    props.onLogin(
      formState.inputs.email.value,
      formState.inputs.password.value
    );
  };

  if (props.loggedIn) {
    return <Redirect to="/profile" />;
  }

  return (
    <React.Fragment>
      <ErrorModal error={props.error} onClear={props.onClearError} />
      <div className={classes.card}>
        {props.loading && <LoadingSpinner asOverlay />}
        <Form onSubmit={submitLogInHandler}>
          <Input
            element="input"
            id="email"
            name="email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            name="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password, at least 6 characters."
            onInput={inputHandler}
          />
          <Button type="submit" size="big" disabled={!formState.isValid}>
            Log In
          </Button>
        </Form>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    error: state.auth.loginError,
    loading: state.auth.loginLoading,
    loggedIn: !!state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (email, password) => {
      dispatch(actions.login(email, password));
    },
    onClearError: () => {
      dispatch(actions.clearError());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
