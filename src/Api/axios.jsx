import axios from 'axios';
import Cookies from 'js-cookie';

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    
    'Accept': 'application/json',
    'X-localization': Cookies.get("i18next") || 'fr',
    'Authorization': 'Bearer '+Cookies.get("authToken") || 1122222,
    
  }
});

axiosClient.defaults.withCredentials = true ;
axiosClient.defaults.withXSRFToken = true ;

// X-localization بشكل لحظي باستخدام Interceptors
axiosClient.interceptors.request.use((config) => {
  // تحديث اللغة من Cookies
  const currentLang = Cookies.get("i18next") || 'fr';
  const token = Cookies.get("authToken") || 'fr';
  config.headers['X-localization'] = currentLang;
  config.headers['Authorization'] ='Bearer '+token;
  
  return config;
});
