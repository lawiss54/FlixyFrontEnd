
import * as React from 'react';
import {RouterProvider} from "react-router-dom";
import {route} from "./Router/index.jsx";
import {ClientContext} from "./Context/ClientContext.jsx";
import { createGlobalStyle } from "styled-components";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import i18n from "i18next";
import HttpApi from 'i18next-http-backend';
import { useTranslation, initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import { HelmetProvider } from "react-helmet-async";


i18n
  .use(initReactI18next) 
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    fallbackLng: "fr",
    rtlLanguages: ["ar", "he"], 
    interpolation: {
      escapeValue: false 
    },
    detection: {
      order: [
        'cookie'
        ],
      caches: ['cookie'],
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{lng}}.json'
    }
  });
  
function App() {
  
  const queryClient = new QueryClient();
  
  
  return(
    
    <div className="bg-[#DDE4EF] bg-auto font-primary  mx-auto h-full w-full">
      <ClientContext>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            
              <RouterProvider router={route} 
                future={{
                  v7_startTransition: true,
                }}
              />
            
          </QueryClientProvider>
        </HelmetProvider>
      </ClientContext>
    </div>
  );
}

export default App
