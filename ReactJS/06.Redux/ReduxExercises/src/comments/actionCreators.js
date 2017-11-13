import * as types from './actionTypes';

function addComment(text) {
    return {
        type: types.ADD_COMMENT,
        text
    };
}