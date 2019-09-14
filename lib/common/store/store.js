import { createStore } from 'redux';

import { appReducer } from '../reducer/app';

const store = createStore(appReducer);

export default store;