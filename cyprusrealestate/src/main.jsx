import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from 'react-auth-kit';
import './i18n'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider
  authType={"cookie"}
  authName={'_auth'}
  cookieDomain={window.location.hostname}
  cookieSecure={true}
  >
  <BrowserRouter>
  
     <App />
  </BrowserRouter>
  </AuthProvider>

</React.StrictMode>
)
