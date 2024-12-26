import React from 'react';

import AppNavigator from './src/routes/AppNavigator';
import {Provider} from 'react-redux';
import {persistor, store} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigator />
      </PersistGate>
      {/* <ToastComponent /> */}
    </Provider>
  );
};

export default App;
