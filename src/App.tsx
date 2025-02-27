import React from 'react';
import { Provider } from 'react-redux';

import { store } from './Store/Store';
import Main from './Components/Main';

const App: React.FC = () => {
  return (

    <Provider store={store}>
      <Main />
    </Provider>
  );
};

export default App;