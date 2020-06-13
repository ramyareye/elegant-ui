import logger from 'redux-logger';
import {persistReducer} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/lib/storage';
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import { useMemo } from "react";
import rootSaga from '@shared/store/sagas/index';
import rootReducers from '@shared/store/reducers';
let store;

const initStore = (initialState) => {
  const defaultMiddlewareConfig = {
    serializableCheck: {
      ignoredActions: ['persist/PERSIST'],
    },
    thunk: false,
  };
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [
    ...getDefaultMiddleware(defaultMiddlewareConfig),
    sagaMiddleware,
  ];

  if (process.env.NODE_ENV === 'development') {
    middleware.push(logger);
  }

  const persistConfig = {
    key: 'elegant-ui',
    storage,
    // whitelist: [''], // place to select which state you want to persist
  };

  const persistedReducer = persistReducer(persistConfig, rootReducers);

  const store = configureStore({
    reducer: persistedReducer,
    preloadedState: initialState,
    middleware,
  });

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);

  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });

    store = undefined;
  }

  if (typeof window === 'undefined') return _store;
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
