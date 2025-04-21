import { createRoot } from "react-dom/client";
import React from "react";
import './assets/css/main.css';
import '@ant-design/v5-patch-for-react-19';
import RouterConfig from "./config/router.config";
import { Provider } from "react-redux";

createRoot(document.getElementById('root')!).render(
    <RouterConfig />
  </Provider>
);
