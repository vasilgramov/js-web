import * as actionTypes from './actionTypes';

export function add(value) {
    return {
        type: actionTypes.ADD,
        value
    };
}

export function subtract(value) {
    return {
        type: actionTypes.SUBTRACT,
        value
    };
}

export function multiply(value) {
    return {
        type: actionTypes.MULTIPLY,
        value
    };
}

export function divide(value) {
    return {
        type: actionTypes.DIVIDE,
        value
    };
}