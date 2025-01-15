// src/app/store.js

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // Combine reducers if necessary

const store = configureStore({
  reducer: rootReducer, // Pass your root reducer here
});

export default store;
