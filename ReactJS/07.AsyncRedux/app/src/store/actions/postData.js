import { RECEIVE_CONTACT, AJAX_DATA } from '../actionTypes';
import { beginAjax, ajaxError } from './ajaxData';

function receiveContact(id, contact) {
    return {
        type: RECEIVE_CONTACT,
        id,
        contact
    };
}

export function updateContact(id, contact) {
    return (dispatch) => {
        dispatch(beginAjax());
        return fetch('http://localhost:8080/contacts/' + id, {
            method: 'POST',
            body: JSON.stringify(contact)
        }).then(() => {
            dispatch(receiveContact(id, contact));
        });
    };
}