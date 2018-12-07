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

export const beginUpdateNotes = () => {
    return { type: types.UPDATE_NOTES};
};

export const updateNotesSuccess = (note) => {
    return {
        type: types.UPDATE_NOTES_SUCCESS,
        note
    };
};

export const updateNotesError = (message) => {
    return {
        type: types.UPDATE_NOTES_ERROR,
        message: message
    };
};

export const beginNewNote = () => {
    return { type: types.NEW_NOTE};
};

export const newNoteSuccess = (note) => {
    return {
        type: types.NEW_NOTE_SUCCESS,
        note
    };
};

export const newNoteError = (message) => {
    return {
        type: types.NEW_NOTE_ERROR,
        message: message
    };
};

export const manualLogin = (data) => {
  return (dispatch) => {
    dispatch(beginLogin());

    return authService().login(data)
      .then((response) => {
          dispatch(loginSuccess('You have been successfully logged in'));
          dispatch(push('/'));
          dispatch(getNotes());
      })
      .catch((err) => {
        dispatch(loginError('Oops! Invalid username or password'));
      });
  };
};

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
        dispatch(beginGetNotes());

        return userService().getNotes()
        .then((response) => {
            dispatch(getNotesSuccess(response.data));
        })
        .catch((error) => {
            dispatch(getNotesError());
        });
    };
};

export const updateNote = (id, text) => {
    return (dispatch) => {
        dispatch(beginUpdateNotes());

        return userService().updateNote(id, text)
        .then( (response) => {
            dispatch(updateNotesSuccess(response.data));
        })
        .catch((error) => {
            dispatch(updateNotesError());
        });
    };
};

export const newNote = (text) => {
    return (dispatch) => {
        dispatch(beginNewNote());

        userService().newNote(text)
        .then( (response) => {
            dispatch(newNoteSuccess(response.data));
            return response.data;
        })
        .catch((error) => {
            dispatch(newNoteError());
        });
    };
};
