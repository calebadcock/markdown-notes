import { combineReducers } from 'redux';
import * as types from '../types';

const notes = (
    state = [],
    action
) => {
    switch (action.type) {
        case types.GET_NOTES_SUCCESS:
            return action;
        default:
            return state;
    }
};

const notesReducer = combineReducers({
  notes
});

export default notesReducer;
