import axios from "axios";

import { OpenSnackBar } from "../snackbar";

import { ISignInPayload, ISignInSuccessfulPayload, IUserAction } from "./user.interface";

export const SIGN_IN_START = "SIGNINSTART";
export const SignInStart = (payload: ISignInPayload): IUserAction => ({
  payload,
  type: SIGN_IN_START,
});

export const SIGN_IN_SUCCESSFUL = "SIGNINSUCCESSFUL";
export const SignInSuccessful = (payload: ISignInSuccessfulPayload): IUserAction => ({
  payload,
  type: SIGN_IN_SUCCESSFUL,
});

export const SIGN_IN_FAILED = "SIGNINFAILED";
export const SignInFailed = (payload: any): IUserAction => ({
  payload,
  type: SIGN_IN_FAILED,
});

export const SignIn = (payload: ISignInPayload) => {
  return (dispatch: any) => {
    dispatch(SignInStart(payload));
    return axios.post(`http://localhost:4000/auth/token`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response: any) => {
      dispatch(SignInSuccessful(response.data));
      dispatch(OpenSnackBar("Signed In Successfully"));
    }).catch((error: any) => {
      dispatch(SignInFailed(error));
      if (error.response) {
        dispatch(OpenSnackBar(`Sign In Faild: ${error.response.data.error}`));
      } else if (error.request) {
        dispatch(OpenSnackBar(`Sign In Faild: Network Error`));
      } else {
        dispatch(OpenSnackBar(`Sign In Faild: ${error.message}`));
      }
    });
  };
};

export const SIGN_OUT = "SIGNOUT";
export const SignOut = (payload: any): IUserAction => ({
  payload,
  type: SIGN_OUT,
});
