import { AJAX_DATA, AJAX_BEGIN, AJAX_ERROR } from '../actionTypes';

export function ajaxData(data) {
    return {
        type: AJAX_DATA,
        data
    };
}

export function beginAjax() {
    return {
        type: AJAX_BEGIN
    };
}

export function ajaxError(error) {
    return {
        type: AJAX_ERROR,
        error
    };
}