import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from "axios";

axios.interceptors.response.use(response => {
    return response;
  },
  error => {
    try {
        if (error.response.data.detail === 'Signature has expired.' || error.response.data.detail === 'Error decoding signature.' ||
            error.response.data.detail === 'Invalid Authorization header. Credentials string should not contain spaces.' || 
            error.response.non_field_errors === 'Error decoding signature.') {
            localStorage.clear();
            window.location.reload();
        }
    }
    catch(error) {
        console.log(error);
    }
    return Promise.reject(error);
  }
);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
