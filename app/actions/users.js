import { push } from 'react-router-redux';
import { authService, userService } from '../services';

import * as types from '../types';

const beginLogin = () => {
  return { type: types.MANUAL_LOGIN_USER };
};

const loginSuccess = (message) => {
  return {
    type: types.LOGIN_SUCCESS_USER,
    message
  };
};

const loginError = (message) => {
  return {
    type: types.LOGIN_ERROR_USER,
    message
  };
};

const signUpError = (message) => {
  return {
    type: types.SIGNUP_ERROR_USER,
    message
  };
};

const beginSignUp = () => {
  return { type: types.SIGNUP_USER };
};

const signUpSuccess = (message) => {
  return {
    type: types.SIGNUP_SUCCESS_USER,
    message
  };
};

const beginLogout = () => {
  return { type: types.LOGOUT_USER};
};

const logoutSuccess = () => {
  return { type: types.LOGOUT_SUCCESS_USER };
};

const logoutError = () => {
  return { type: types.LOGOUT_ERROR_USER };
};

export const toggleLoginMode = () => {
  return { type: types.TOGGLE_LOGIN_MODE };
};

export const beginGetNotes = () => {
    return { type: types.GET_NOTES};
};

export const getNotesSuccess = (notes) => {
    return {
        type: types.GET_NOTES_SUCCESS,
        notes
    };
};

export const getNotesError = (message) => {
    return {
        type: types.GET_NOTES_ERROR,
        message: message
    };
};

export function manualLogin(data) {
  return (dispatch) => {
    dispatch(beginLogin());

    return authService().login(data)
      .then((response) => {
          dispatch(loginSuccess('You have been successfully logged in'));
          dispatch(push('/'));
      })
      .catch((err) => {
        dispatch(loginError('Oops! Invalid username or password'));
      });
  };
}

export const logout = () => {
  return (dispatch) => {
    dispatch(beginLogout());

    return authService().logOut()
      .then((response) => {
          dispatch(logoutSuccess());
      })
      .catch((err) => {
        dispatch(logoutError());
      });
  };
};

export const getNotes = () => {
    return (dispatch) => {
    console.log('begin notes');
    dispatch(beginGetNotes());
    console.log('getting notes');
    return userService().getNotes()
      .then((response) => {
          console.log('got here ??????')
          console.log('response', response);
          dispatch(getNotesSuccess(response.data));
          dispatch(push('/'));
      })
      .catch((error) => {
          dispatch(getNotesError());
      });
    }
};
