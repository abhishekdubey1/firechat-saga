import {
  SET_CURRENT_USER,
  SET_AUTH_LOADING,
  CLEAR_CURRENT_USER,
  LOGIN_USER,
  SIGNUP_USER,
  LOGOUT_USER,
} from "./types";

export const setLoading = (status) => ({
  type: SET_AUTH_LOADING,
  payload: status,
});

export const loginUser = (userData, history) => ({
  type: LOGIN_USER,
  payload: { userData, history },
});

export const setCurrentUser = (userData) => ({
  type: SET_CURRENT_USER,
  payload: userData,
});

export const signUpUser = (userData, history) => ({
  type: SIGNUP_USER,
  payload: { userData, history },
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
});

export const clearCurrentUser = () => ({
  type: CLEAR_CURRENT_USER,
});
