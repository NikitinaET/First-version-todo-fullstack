import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import App from './App.jsx';
//import thunk from 'redux-thunk'
import { /*applyMiddleware, */combineReducers } from 'redux';
import todoSlice from './store/createSlice';
import { Provider } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from 'redux-devtools-extension';

const reducer = combineReducers({
  todo: todoSlice,
});
const store = configureStore({
  reducer,
  composeWithDevTools
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
      <App/>
    </Provider>  
  </React.StrictMode>,
  document.getElementById('root')
);
