import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './Login'
import * as serviceWorker from './serviceWorker';
import store from './store'
import {Provider} from 'react-redux'

let user = {username:'terry'};
// let user = null;
let show =<Login/>;
if(user){
  show = <App/>;
}

ReactDOM.render(
  <Provider store={store}>
    {show}
  </Provider>

, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
