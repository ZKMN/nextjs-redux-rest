import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga'
import {createWrapper} from 'next-redux-wrapper'
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import { LOGOUT } from './actions';
import rootSaga from "./sagas/rootSaga";
import rootReducer from "./reducers/rootReducer";

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  let createRootReducer = rootReducer();

  createRootReducer = (state, action) => {
    if (action.type === LOGOUT) {
      return rootReducer()(undefined, action);
    }

    return rootReducer()(state, action);
  };

  const store = createStore(
    createRootReducer,
    composeWithDevTools(
      applyMiddleware(
        sagaMiddleware,
      ),
    ),
  );

  sagaMiddleware.run(rootSaga);

  return store;
};

export default createWrapper(configureStore)
