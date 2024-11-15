"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";

type ReduxProviderProps = {
  children: React.ReactNode;
};

export default function ReduxProvider({ children }: ReduxProviderProps) {
  let reduxPersistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={reduxPersistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
