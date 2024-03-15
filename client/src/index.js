import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, useParams, useLocation } from "react-router-dom"
import { AuthContext } from './pages/api/api';
import { store } from './app/store'
import { Provider } from 'react-redux'

import 'react-toastify/dist/ReactToastify.css';
import { GoogleOAuthProvider } from '@react-oauth/google'
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <>

    <GoogleOAuthProvider clientId='1049557792860-j3nbo2dumlt621jbj22i6cf5u8juto1t.apps.googleusercontent.com'>
      <AuthContext.Provider>
        <React.StrictMode>
          <Provider store={store}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </Provider>
        </React.StrictMode>
      </AuthContext.Provider>
    </GoogleOAuthProvider>
  </>
);

reportWebVitals();
