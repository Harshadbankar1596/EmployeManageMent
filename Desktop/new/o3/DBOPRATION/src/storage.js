


import { configureStore } from '@reduxjs/toolkit';
import { api } from './data.js';
// import { persistStore, persistReducer } from 'redux-persist';
import counterSlice from './counterslice.js';

// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    counterslice: counterSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  devTools: true,
});

export default store;
