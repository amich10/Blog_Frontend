import { createRoot } from "react-dom/client";
import React from "react";
import './assets/css/main.css'
import '@ant-design/v5-patch-for-react-19';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterConfig></RouterConfig>
  </React.StrictMode>
)