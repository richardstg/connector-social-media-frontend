import React, { useEffect } from "react";
import { connect } from "react-redux";

import Button from "../../shared/components/Form/Button/Button";
import LoadingSpinner from "../../shared/components/UI/LoadingSpinner/LoadingSpinner";
import ImageUpload from "../../shared/components/Form/ImageUpload/ImageUpload";
import { useForm } from "../../shared/hooks/form-hook";
import * as actions from "../../store/actions/index";
import classes from "./UpdateProfileImage.module.scss";

const UpdateProfileImage = (props) => {
  const {
    userId,
    token,
    updateUserImageLoading,
    updateUserImageSuccess,
    onUpdateUserImageSuccess,
    onResetUpdateUserSuccess,
  } = props;

  const [formState, inputHandler] = useForm(
    {
      image: {
        value: null,
        isValid: true,
      },
    },
    false
  );

  const submitUpdatesHandler = (event) => {
    event.preventDefault();
    props.onUpdateUserImage(userId, token, formState.inputs.image.value);
  };

  if (updateUserImageSuccess) {
    onUpdateUserImageSuccess();
  }

  useEffect(() => {
    return () => {
      onResetUpdateUserSuccess();
    };
  }, [onResetUpdateUserSuccess]);

  return (
    <div className={classes.container}>
      {updateUserImageLoading && <LoadingSpinner asOverlay />}
      <form onSubmit={submitUpdatesHandler}>
        <ImageUpload center id="image" name="image" onInput={inputHandler} />
        <Button big type="submit" disabled={!formState.isValid}>
          Submit
        </Button>
      </form>
      {updateUserImageSuccess && (
        <p className={classes.confirmUpdate}>Image updated!</p>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    token: state.auth.token,
    updateUserImageLoading: state.user.updateUserImageLoading,
    updateUserImageSuccess: state.user.updateUserImageSuccess,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateUserImage: (userId, token, image) =>
      dispatch(actions.updateUserImage(userId, token, image)),
    onClearUserError: () => dispatch(actions.clearUserError()),
    onResetUpdateUserSuccess: () => dispatch(actions.resetUpdateUserSuccess()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfileImage);
