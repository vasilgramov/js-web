import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

function handler(id) {
    ReactDOM.render(<App id = {id}/>, document.getElementById('root'));
}

handler(0);


registerServiceWorker();
