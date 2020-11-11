import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Modal from "../../shared/components/UI/Modal/Modal";
import Button from "../../shared/components/Form/Button/Button";
import Input from "../../shared/components/Form/Input/Input";
import ErrorModal from "../../shared/components/UI/ErrorModal/ErrorModal";
import LoadingSpinner from "../../shared/components/UI/LoadingSpinner/LoadingSpinner";
import ImageUpload from "../../shared/components/Form/ImageUpload/ImageUpload";
import { useForm } from "../../shared/hooks/form-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import * as actions from "../../store/actions/index";
import classes from "./SignUp.module.scss";

const SignUp = (props) => {
  const [formState, inputHandler] = useForm(
    {
      firstName: {
        value: "",
        isValid: false,
      },
      lastName: {
        value: "",
        isValid: false,
      },
      birthYear: {
        value: "",
        isValid: false,
      },
      birthMonth: {
        value: "",
        isValid: false,
      },
      birthDay: {
        value: "",
        isValid: false,
      },
      gender: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
      confirmPassword: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: true,
      },
    },
    false
  );

  const submitSignUpHandler = (event) => {
    event.preventDefault();

    const birthDate =
      formState.inputs.birthYear.value +
      "-" +
      formState.inputs.birthMonth.value +
      "-" +
      formState.inputs.birthDay.value;

    props.onSignup(
      formState.inputs.firstName.value,
      formState.inputs.lastName.value,
      birthDate,
      formState.inputs.gender.value,
      formState.inputs.description.value,
      formState.inputs.email.value,
      formState.inputs.password.value,
      formState.inputs.image.value
    );
  };

  if (props.loggedIn) {
    return <Redirect to="/profile" />;
  }

  return (
    <React.Fragment>
      <ErrorModal error={props.error} onClear={props.onClearError} />
      <Modal
        header="Sign Up"
        onSubmit={submitSignUpHandler}
        show={props.show}
        onCancel={props.onCancel}
      >
        <ImageUpload center id="image" name="image" onInput={inputHandler} />
        <div className={classes.container}>
          {props.loading && <LoadingSpinner asOverlay />}
          <Input
            element="input"
            id="firstName"
            name="firstName"
            type="text"
            label="First Name*"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter your first name."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="lastName"
            name="lastName"
            type="text"
            label="Last Name*"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter your last name."
            onInput={inputHandler}
          />
          <div className={classes.born}>
            <label className={classes.label}>Born*</label>
            <div className={classes.flex}>
              <Input
                element="year"
                id="birthYear"
                name="birthYear"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
              />
              <Input
                element="month"
                id="birthMonth"
                name="birthMonth"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
              />
              <Input
                element="day"
                id="birthDay"
                name="birthDay"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
              />
            </div>
          </div>
          <div className={classes.gender}>
            <div className={classes.flex}>
              <Input
                element="radio"
                id="male"
                type="radio"
                name="gender"
                value="male"
                label="Male"
                validators={[]}
                onInput={inputHandler}
                checked={formState.inputs.gender.value === "male" && "checked"}
                initialValue="male"
                initialValid={true}
              />
              <Input
                element="radio"
                id="female"
                type="radio"
                name="gender"
                value="female"
                label="Female"
                validators={[]}
                onInput={inputHandler}
                checked={
                  formState.inputs.gender.value === "female" && "checked"
                }
                initialValue="male"
                initialValid={true}
              />
              <Input
                element="radio"
                id="other"
                type="radio"
                value="other"
                name="gender"
                label="Other"
                validators={[]}
                onInput={inputHandler}
                checked={formState.inputs.gender.value === "other" && "checked"}
                initialValue="male"
                initialValid={true}
              />
            </div>
          </div>
          <Input
            element="textarea"
            id="description"
            name="description"
            label="Make a short description of yourself.*"
            validators={[VALIDATOR_REQUIRE()]}
            errorText=""
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="email"
            name="email"
            type="email"
            label="E-Mail*"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            name="password"
            type="password"
            label="Password*"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password, at least 6 characters."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm password*"
            validateEqual
            validValue={formState.inputs.password.value}
            errorText="The passwords don't match."
            onInput={inputHandler}
          />
          <Button big type="submit" disabled={!formState.isValid}>
            Sign Up
          </Button>
        </div>
      </Modal>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    error: state.auth.signupError,
    loading: state.auth.signupLoading,
    loggedIn: !!state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignup: (
      firstName,
      lastName,
      birthDate,
      gender,
      description,
      email,
      password,
      image
    ) =>
      dispatch(
        actions.signup(
          firstName,
          lastName,
          birthDate,
          gender,
          description,
          email,
          password,
          image
        )
      ),
    onClearError: () => {
      dispatch(actions.clearError());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
