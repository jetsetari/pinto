import React from "react";

import App from "./App";

import { registerRootComponent } from "expo";



//Redux
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "~/redux/store";

function RNRedux() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
}
registerRootComponent(RNRedux);
