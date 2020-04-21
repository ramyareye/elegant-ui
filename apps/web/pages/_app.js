import App from 'next/app';
import * as React from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';

import withReduxStore from 'store/with-redux-store';

import 'styles/index.scss';

Router.events.on('routeChangeStart', (url) => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

class MyApp extends App {
  constructor(props) {
    super(props);
    this.persistor = persistStore(props.reduxStore);
  }

  render() {
    const {Component, pageProps, reduxStore} = this.props;
    return (
      <Provider store={reduxStore}>
        <PersistGate
          loading={<Component {...pageProps} />}
          persistor={this.persistor}
        >
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    );
  }
}

export default withReduxStore(MyApp);
