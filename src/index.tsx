import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "./assets/stylesheets/style.css"
import { BrowserRouter } from "react-router-dom"
import { NotificationsProvider } from '@mantine/notifications';
import { AppContextProvider } from './context/AppContex';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <NotificationsProvider>
          <App />
        </NotificationsProvider>
      </AppContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
