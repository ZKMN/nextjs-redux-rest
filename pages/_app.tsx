import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { useStore } from 'redux-base/configureStore';
import { locationChangeAction } from 'redux-base/actions';

const LocationChange: React.FC<any> = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleRouteChange = () => dispatch(locationChangeAction());

    router.events.on('routeChangeStart', handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => router.events.off('routeChangeStart', handleRouteChange);
  }, []);

  return children;
};

const App = ({ Component, pageProps }: { Component: React.FC, pageProps: any }) => {

  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <LocationChange>
        <Component {...pageProps} />
      </LocationChange>
    </Provider>
  );
};

export default App;