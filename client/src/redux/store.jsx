// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../utils/reducers';

const store = configureStore({
  reducer: rootReducer
});

export default store;
