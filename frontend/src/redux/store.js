import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import transactionReducer from "./transactionSlice";
import combinedDataReducer from "./combinedDataSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  transaction: transactionReducer,
  combinedData: combinedDataReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;
