import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import "../src/assets/css/Style.css";
import "../src/assets/css/Responsive.css";
import store from "./app/store.js"
// import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from '../src/components/ThemeContext.jsx';


ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </ThemeProvider>
);
