import { combineReducers } from 'redux';
import * as types from '../types';

const values = (
    state = [],
    action
) => {
    switch (action.type) {
    case types.GET_NOTES_SUCCESS:
        action.notes.sort( (a, b) => {
            return new Date(b.updatedAt) - new Date(a.updatedAt);
        });
        return action.notes;

    case types.NEW_NOTE_SUCCESS:
        const notes = [...state, action.note];
        notes.sort( (a, b) => {
            return new Date(b.updatedAt) - new Date(a.updatedAt);
        });
        return notes;

    case types.UPDATE_NOTES_SUCCESS:
        const newState = state.map( (note) => {
            return note.id == action.note.id ? action.note : note
        })
        newState.sort( (a, b) => {
            return new Date(b.updatedAt) - new Date(a.updatedAt);
        });
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
