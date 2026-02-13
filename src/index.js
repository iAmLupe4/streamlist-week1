import React from "react"; 
import ReactDOM from "react-dom/client"; 
import App from "./App"; 
import "./styles/global.css"; 
import { CartProvider } from "./context/CartContext";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const root = ReactDOM.createRoot(document.getElementById("root")); 

root.render(
  <React.StrictMode> 
    <CartProvider>
    <App /> 
    </CartProvider>
  </React.StrictMode> 
); 

//Register service worker for PWA functionality
serviceWorkerRegistration.register();