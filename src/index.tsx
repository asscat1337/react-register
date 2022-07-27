import React from 'react';
import {BrowserRouter} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import reportWebVitals from './reportWebVitals';
import {persistor,store} from "./store";
import {PersistGate} from "redux-persist/integration/react";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
     <React.StrictMode>
        <Provider store={store}>
                <PersistGate persistor={persistor} loading={null}>
                        <BrowserRouter>
                                <App/>
                        </BrowserRouter>
                </PersistGate>
        </Provider>
     </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
