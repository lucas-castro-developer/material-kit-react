import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import multi from 'redux-multi';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import * as serviceWorker from './serviceWorker';
import App from './App';
import mainReducer from './store';

const store = applyMiddleware(thunk, multi)(createStore)(mainReducer);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();
