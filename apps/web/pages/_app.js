import App from 'next/app';
import * as React from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';

import {useStore} from 'store';

import 'styles/index.scss';

Router.events.on('routeChangeStart', (url) => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const App = ({Component, pageProps}) => {
  const store = useStore(pageProps.initialReduxState);
  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={<Component {...pageProps} />} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
};

export default App;
