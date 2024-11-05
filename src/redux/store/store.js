import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loginAccessReducer from "../slice/authTokenSlice";
// import { persistReducer, persistStore } from "redux-persist";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import storage from "redux-persist/lib/storage";
import staffenroll from "../slice/staffenrollment-slice";

const authTokenAccessPersistConfig = {
  key: "authTokenAccess",
  storage: storage,
  whitelist: ["token"],
};

const rootReducer = combineReducers({
  authTokenAccess: persistReducer(
    authTokenAccessPersistConfig,
    loginAccessReducer
  ),
  staffenrollmentAccess: staffenroll,
});

const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  devTools: true,
});

export const persistor = persistStore(store);
export default store;
