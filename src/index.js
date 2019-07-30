import React from 'react';
import * as Sentry from '@sentry/browser';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import './../node_modules/bulma/css/bulma.css';
import config from './config.json';

Sentry.init({
    dsn: "https://381c8f00405d4aa89750a9ef91c09b98@sentry.slock.it/7",
    release: "voting-ui@" + config.version,
    environment: config.environment
});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
