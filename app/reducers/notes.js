import { combineReducers } from 'redux';
import * as types from '../types';

const values = (
    state = [],
    action
) => {
    switch (action.type) {
    case types.GET_NOTES_SUCCESS:
        return action.notes;
    default:
        return state;
    }
};

const notesReducer = combineReducers({
  values
});

export default notesReducer;
