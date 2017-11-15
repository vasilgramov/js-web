import React from 'react';
import ReactDOM from 'react-dom';
import './site.css';
import './contact.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import reducers from './store/reducers';
import fetchData from './store/actions/fetchData';
import '../node_modules/toastr/build/toastr.min.css';
import toastr from 'toastr';

const store = createStore(
    combineReducers(reducers),
    applyMiddleware(thunk)
);

const p = store.dispatch(fetchData());
p.then(() => {
    toastr.success('Contacts loaded');
});

ReactDOM.render((
    <Router>
        <Provider store={store} >
            <App />
        </Provider>
    </Router>
), document.getElementById('root'));
registerServiceWorker();

