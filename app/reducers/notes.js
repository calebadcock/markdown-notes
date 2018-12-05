import { combineReducers } from 'redux';
import * as types from '../types';

const values = (
    state = [],
    action
) => {
    switch (action.type) {
    case types.GET_NOTES_SUCCESS:
        return action.notes;

    case types.NEW_NOTE_SUCCESS:
        return [...state, action.note]

    case types.UPDATE_NOTES_SUCCESS:
        const newState = state.map( (note) => {
            return note.id == action.note.id ? action.note : note
        })
        return newState;
    default:
        return state;
    }
};

const note = (
    state = {},
    action
) => {
    switch (action.type) {
    case types.NEW_NOTE_SUCCESS:
        return action.note;
    default:
        return state;
    }
};

const notesReducer = combineReducers({
  values,
  note,
});

export default notesReducer;
