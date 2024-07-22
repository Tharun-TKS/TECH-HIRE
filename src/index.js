import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import {store,persistor} from './store/store';
import  ThemeContext  from "./context/ThemeContext"; 
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store = {store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <ThemeContext>
          <App />
        </ThemeContext>
      </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
reportWebVitals();