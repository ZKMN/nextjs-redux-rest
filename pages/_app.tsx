import React from 'react';
import { Provider } from 'react-redux';
import { useStore } from 'redux-base/configureStore';

const App = ({ Component, pageProps }: { Component: React.FC, pageProps: any }) => {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default App;