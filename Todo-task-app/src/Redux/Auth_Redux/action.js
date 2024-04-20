import axios from "axios";
import * as ActionTypes from "../ActionTypes";

import toast from "react-hot-toast";
export const signinRequest = () => ({ type: ActionTypes.SIGNIN_REQUEST });
export const signinSuccess = (userData) => ({
  type: ActionTypes.SIGNIN_SUCCESS,
  payload: userData,
});
export const signinError = (error) => ({
  type: ActionTypes.SIGNIN_ERROR,
  payload: error,
});

export const signinUser = (userData) => async (dispatch) => {
  dispatch(signinRequest());

  try {
    const response = await axios.post(
      "https://todo-backend-1brf.onrender.com/user/login",
      userData
    );
    const token = response.data.token;
    localStorage.setItem("logintoken", token);
    dispatch(signinSuccess(response.data));

    console.log(response.data);

    toast.success("User Login successfully !", {
      style: {
        borderRadius: "50px",
        background: "#000428",
        color: "#ffffff",
        padding: "1rem 1.5rem",
        fontWeight: "600",
      },
    });
  } catch (error) {
    dispatch(signinError(error.response.data.error));
    toast.error("use Correct Credential", {
      style: {
        borderRadius: "50px",
        background: "#000428",
        color: "#ffffff",
        padding: "1rem 1.5rem",
        fontWeight: "600",
      },
    });
  }
};

export const signupRequest = () => ({ type: ActionTypes.SIGNUP_REQUEST });
export const signupSuccess = (userData) => ({
  type: ActionTypes.SIGNUP_SUCCESS,
  payload: userData,
});
export const signupError = (error) => ({
  type: ActionTypes.SIGNUP_ERROR,
  payload: error,
});

export const signupUser = (userData) => async (dispatch) => {
  dispatch(signupRequest());

  try {
    const response = await axios.post(
      "https://todo-backend-1brf.onrender.com/user/register",
      userData
    );
    dispatch(signupSuccess(response.data));
    toast.success("User registartion successfull !", {
      style: {
        borderRadius: "50px",
        background: "#000428",
        color: "#ffffff",
        padding: "1rem 1.5rem",
        fontWeight: "600",
      },
    });
  } catch (error) {
    dispatch(signinError(error.response.msg || "An error occurred"));

    // toast.error(error.response.msg || "An error occurred", {
    //     style: {
    //         borderRadius: "50px",
    //         background: "#000428",
    //         color: "#ffffff",
    //         padding: "1rem 1.5rem",
    //         fontWeight: "600",
    //     },
    // });
  }
};

export const logoutRequest = () => ({ type: ActionTypes.LOGOUT_REQUEST });
export const logoutSuccess = () => ({ type: ActionTypes.LOGOUT_SUCCESS });

export const logoutUser = () => (dispatch) => {
  dispatch(logoutRequest());

  dispatch(logoutSuccess());
  localStorage.removeItem("logintoken");
  toast.success("User Logout Please login !", {
    style: {
      borderRadius: "50px",
      background: "#000428",
      color: "#ffffff",
      padding: "1rem 1.5rem",
      fontWeight: "600",
    },
  });
};
