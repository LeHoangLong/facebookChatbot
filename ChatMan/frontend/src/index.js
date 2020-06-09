import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import thunk from 'redux-thunk';
import { Helmet } from "react-helmet";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunk)
));

ReactDOM.render(
  <Router>
    <Helmet>
    </Helmet>
    <Provider store={store}>
      <App></App>
    </Provider>
  </Router>,
  document.getElementById('root')
);

