import { useMemo } from 'react';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import { LOGOUT } from './actions';
import rootSaga from './sagas/rootSaga';
import rootReducer from './reducers/rootReducer';

let createRootReducer = rootReducer();
const createdStore = createStore(createRootReducer);

let store: typeof createdStore | undefined;

const initStore = <T>(preloadedState: T) => {
  const sagaMiddleware = createSagaMiddleware();

  createRootReducer = (state, action) => {
    if (action.type === LOGOUT) {
      return rootReducer()(undefined, action);
    }

    return rootReducer()(state, action);
  };

  const store = createStore(
    createRootReducer,
    preloadedState,
    composeWithDevTools(
      applyMiddleware(sagaMiddleware),
    ),
  );

  sagaMiddleware.run(rootSaga);

  return store;
};

export const initializeStore = <T>(preloadedState?: T) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export const useStore = <T>(initialState: T) => {
  const store = useMemo(() => initializeStore(initialState), [initialState]);

  return store;
};

export type RootState = ReturnType<typeof createdStore.getState>;
