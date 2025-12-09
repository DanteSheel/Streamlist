import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from './context/AuthContext';
import * as serviceWorkerRegistration from './serviceWorkerRegistration'; 

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId="1086160187526-laugbo90me2gek68fop9jvpms9vgiflr.apps.googleusercontent.com">
      <AuthProvider>
        <App />
      </AuthProvider>
    </GoogleOAuthProvider>
  </BrowserRouter>
);

serviceWorkerRegistration.register(); 

