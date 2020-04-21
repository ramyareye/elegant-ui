import logger from 'redux-logger';
import {persistReducer} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/lib/storage';
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';

import rootSaga from '@shared/store/sagas/index';
import rootReducers from '@shared/store/reducers';

const makeStore = (initialState) => {
  const defaultMiddlewareConfig = {
    serializableCheck: {
      ignoredActions: ['persist/PERSIST'],
    },
  };
  const sagaMiddleware = createSagaMiddleware();

  const middleware = [
    sagaMiddleware,
    ...getDefaultMiddleware(defaultMiddlewareConfig),
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

  // 3: Run your sagas:
  sagaMiddleware.run(rootSaga);

  // 4: now return the store:
  return store;
};

export default makeStore;
