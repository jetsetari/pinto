
// The Store is the object that brings the state together.

import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from '@react-native-async-storage/async-storage';

import rootReducer from "../reducers"; 

const persistConfig = {
  key: "root",
  storage: AsyncStorage
};

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(pReducer);
export const persistor = persistStore(store);