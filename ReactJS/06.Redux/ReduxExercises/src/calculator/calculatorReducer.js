import * as actionTypes from './actionTypes';

export default function calculator(oldState = 10, action) {
    switch (action.type) {
        case actionTypes.ADD:
            return oldState + action.value;
        case actionTypes.SUBTRACT:
            return oldState - action.value;
        case actionTypes.MULTIPLY:
            return oldState * action.value;
        case actionTypes.DIVIDE:
            return oldState / action.value;
        default: return oldState;
    }
}