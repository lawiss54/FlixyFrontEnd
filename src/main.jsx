import React,{ StrictMode } from 'react';
import { render } from 'react-dom';
import { createRoot } from 'react-dom/client';
import {NextUIProvider} from '@nextui-org/react';
import './index.css';
import App from './App.jsx';
// optional configuration



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NextUIProvider>
      <App />
    </NextUIProvider>
  </StrictMode>,
);
