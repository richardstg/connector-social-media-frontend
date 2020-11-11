import React, { useEffect } from "react";
import { connect } from "react-redux";

import Input from "../../shared/components/Form/Input/Input";
import Button from "../../shared/components/Form/Button/Button";
import LoadingSpinner from "../../shared/components/UI/LoadingSpinner/LoadingSpinner";
import { useForm } from "../../shared/hooks/form-hook";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import * as actions from "../../store/actions/index";
import classes from "./UpdateProfileInfo.module.scss";

const UpdateProfileInfo = (props) => {
  const {
    userId,
    token,
    firstName,
    lastName,
    birthDate,
    description,
    gender,
    onUpdateUserInfo,
    updateUserInfoLoading,
    updateUserInfoSuccess,
    onUpdateUserInfoSuccess,
    onResetUpdateUserSuccess,
  } = props;

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
      description: {
        value: "",
        isValid: false,
      },
      gender: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const submitUpdatesHandler = (event) => {
    event.preventDefault();
    const birthDate =
      formState.inputs.birthYear.value +
      "-" +
      formState.inputs.birthMonth.value +
      "-" +
      formState.inputs.birthDay.value;
    onUpdateUserInfo(
      userId,
      token,
      formState.inputs.firstName.value,
      formState.inputs.lastName.value,
      birthDate,
      formState.inputs.description.value,
      formState.inputs.gender.value
    );
  };

  if (updateUserInfoSuccess) {
    onUpdateUserInfoSuccess();
  }

  useEffect(() => {
    return () => {
      onResetUpdateUserSuccess();
    };
  }, [onResetUpdateUserSuccess]);

  return (
    <div className={classes.container}>
      {updateUserInfoLoading && <LoadingSpinner asOverlay />}
      <form onSubmit={submitUpdatesHandler}>
        <Input
          element="input"
          id="firstName"
          name="firstName"
          type="text"
          label="Your First Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter your first name."
          onInput={inputHandler}
          initialValue={firstName}
          initialValid={true}
        />
        <Input
          element="input"
          id="lastName"
          name="lastName"
          type="text"
          label="Your Last Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter your last name."
          onInput={inputHandler}
          initialValue={lastName}
          initialValid={true}
        />
        <div className={classes.born}>
          <label className={classes.label}>Born</label>
          <div className={classes.flex}>
            <Input
              element="year"
              id="birthYear"
              name="birthYear"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please select your year of birth."
              onInput={inputHandler}
              initialValue={birthDate.substr(0, 4)}
              initialValid={true}
            />
            <Input
              element="month"
              id="birthMonth"
              name="birthMonth"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please select your month of birth."
              onInput={inputHandler}
              initialValue={birthDate.substr(5, 2)}
              initialValid={true}
            />
            <Input
              element="day"
              id="birthDay"
              name="birthDay"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please select your day of birth."
              onInput={inputHandler}
              initialValue={birthDate.substr(8, 2)}
              initialValid={true}
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
              initialValue={gender}
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
              checked={formState.inputs.gender.value === "female" && "checked"}
              initialValue={gender}
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
              initialValue={gender}
              initialValid={true}
            />
          </div>
        </div>
        <Input
          element="textarea"
          id="description"
          name="description"
          type="text"
          label="Make a short description of yourself."
          validators={[VALIDATOR_REQUIRE()]}
          errorText=""
          onInput={inputHandler}
          initialValue={description}
          initialValid={true}
        />
        <Button big type="submit" disabled={!formState.isValid}>
          Submit Changes
        </Button>
      </form>
      {updateUserInfoSuccess && (
        <p className={classes.confirmUpdate}>Info updated!</p>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    token: state.auth.token,
    updateUserInfoLoading: state.auth.updateUserInfoLoading,
    updateUserInfoSuccess: state.user.updateUserInfoSuccess,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateUserInfo: (
      userId,
      token,
      firstName,
      lastName,
      birthDate,
      description,
      gender
    ) =>
      dispatch(
        actions.updateUserInfo(
          userId,
          token,
          firstName,
          lastName,
          birthDate,
          description,
          gender
        )
      ),
    onResetUpdateUserSuccess: () => dispatch(actions.resetUpdateUserSuccess()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfileInfo);
