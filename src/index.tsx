import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import styled from "styled-components";

const Frame = styled.html`
  height: 100%;
  overflow-y: hidden;
`;

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Frame>
        <App />
      </Frame>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
reportWebVitals();
