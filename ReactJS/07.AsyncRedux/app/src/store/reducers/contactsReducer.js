import { AJAX_DATA, RECEIVE_CONTACT } from '../actionTypes';

export default function contacts(state = [], action) {
    switch (action.type) {
    case AJAX_DATA:
        return action.data;
    case RECEIVE_CONTACT:
        const contact = Object.assign({}, action.contact, {id: action.id});
        const newState = state.filter(c => c.id !== action.id);
        newState.push(contact);
        return newState;
    default:
        return state;
    }
};