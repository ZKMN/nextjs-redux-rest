import React from 'react';
import App from 'next/app';
import withReduxSaga from 'next-redux-saga';

import wrapper from 'redux-base/configureStore';

import 'styles/global.scss';

class FreshiiApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return <Component {...pageProps} />;
  }
}

export default wrapper.withRedux(withReduxSaga(FreshiiApp));
