import React from 'react';
import logo from './logo.svg';
import './App.css';
import { DashBoardContainer } from './DashBoardContainer'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Helmet} from "react-helmet";
import { Provider } from 'react-redux';

import { createStore, applyMiddleware, compose } from 'redux';
import { rootReducer } from './reducers';
import thunk from 'redux-thunk';
import axios from 'axios';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunk)
));

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

function App() {
  return (
    <Provider store={store}>
         <Helmet>
                <meta charSet="utf-8" />
                <title>Admin page</title>
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous"/>
          </Helmet>
        <DashBoardContainer></DashBoardContainer>
    </Provider>
  );
}

export default App;
