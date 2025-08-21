// import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import { apiSlice } from './apislice';
// import userReducer from './userslice/userslice';
// import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
// import { adminapi } from './adminapislice';
// import { leaveslice } from './leaveslice';
// import { superadmin } from './superadminslice';

// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['user'],
// };

// const rootReducer = combineReducers({
//   user: userReducer,
//   [apiSlice.reducerPath]: apiSlice.reducer,
//   [adminapi.reducerPath]: adminapi.reducer,
//   [leaveslice.reducerPath] : leaveslice.reducer,
//   [superadmin.reducerPath] : superadmin.reducer
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER , "user/setuser"]
//       },
//     }).concat(apiSlice.middleware).concat(adminapi.middleware).concat(leaveslice.middleware).concat(superadmin.middleware),
// });

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { apiSlice } from './apislice';
import userReducer from './userslice/userslice';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { adminapi } from './adminapislice';
import { leaveslice } from './leaveslice';
import { superadmin } from './superadminslice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  user: userReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  [adminapi.reducerPath]: adminapi.reducer,
  [leaveslice.reducerPath]: leaveslice.reducer,
  [superadmin.reducerPath]: superadmin.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          "user/setuser", // आपका custom action
        ],
        ignoredPaths: ["user.resume"], // optional, अगर resume में buffer/base64 है
      },
    })
      .concat(apiSlice.middleware)
      .concat(adminapi.middleware)
      .concat(leaveslice.middleware)
      .concat(superadmin.middleware),
});
