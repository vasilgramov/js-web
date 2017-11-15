import { AJAX_BEGIN, AJAX_ERROR, AJAX_DATA, RECEIVE_CONTACT } from '../actionTypes';

export default function (state = 0, action) {
    switch (action.type) {
    case AJAX_BEGIN:
        return state + 1;
    case AJAX_DATA:
    case AJAX_ERROR:
    case RECEIVE_CONTACT:
        return state - 1;
    default:
        return state;
    }
}