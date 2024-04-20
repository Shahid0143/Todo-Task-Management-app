import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { Provider as ReduxProvider } from "react-redux";
import { store } from "./Redux/store";
import { BrowserRouter } from "react-router-dom";


ReactDOM.render(
  
    <BrowserRouter>
      <ReduxProvider store={store}>
        
          <App />
       
      </ReduxProvider>
    </BrowserRouter>
  ,
  document.getElementById("root")
);
