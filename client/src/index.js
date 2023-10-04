import React from 'react';
import ReactDOM from 'react-dom';
import App from "./router/App";
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import { store } from "./store"
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import dotenv from "dotenv";


dotenv.config();

axios.defaults.baseURL = "http://localhost:3001";

ReactDOM.render(
  <Provider store = {store}>
    <React.StrictMode>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();