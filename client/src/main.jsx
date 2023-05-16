import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./styles/dark.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./reducer/store.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
let persistor=persistStore(store)
ReactDOM.createRoot(document.getElementById("root")).render(

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Router>
        <App />
      </Router>
      </PersistGate>
    </Provider>

);
