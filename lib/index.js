import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from 'common/store/store';

import Layout from './Layout';

render(
  <Provider store={store}>
    <Layout />
  </Provider>,
  document.getElementById('app')
);