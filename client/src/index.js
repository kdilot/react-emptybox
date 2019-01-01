import React from 'react';
import { render } from 'react-dom';
import './index.css';
import './theme.css';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './modules';
import App from './App';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from 'sagas';
// import logger from 'redux-logger';

const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducers, applyMiddleware(sagaMiddleware))
// const store = createStore(reducers, applyMiddleware(sagaMiddleware, logger))
sagaMiddleware.run(rootSaga)

render((
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
), document.getElementById('root'))
