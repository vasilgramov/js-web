import { createStore, combineReducers } from 'redux';
import calculator from './calculator/calculatorReducer';
import comments from './comments/commentReducer';

const store = createStore(combineReducers({
    calculator,
    comments
}), {
    calculator: 11,
    comments: [
        'hi',
        'hello'
    ]
});

export default store;