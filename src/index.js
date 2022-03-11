import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import NewApp from './newApp.jsx';
import thunk from 'redux-thunk'
import { createStore, compose, applyMiddleware } from 'redux';
import { todoReducer } from './store/reducers';
import { Provider } from 'react-redux';

const store = createStore(todoReducer, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
      <NewApp/>
    </Provider>  
  </React.StrictMode>,
  document.getElementById('root')
);
