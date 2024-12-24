import axios from 'axios';
import Cookies from 'js-cookie';

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
    'X-localization': Cookies.get("i18next") || 'fr',
    'Breare': Cookies.get("authToken"),
  }
});

axiosClient.defaults.withCredentials = true ;
axiosClient.defaults.withXSRFToken = true ;

// X-localization بشكل لحظي باستخدام Interceptors
axiosClient.interceptors.request.use((config) => {
  // تحديث اللغة من Cookies
  const currentLang = Cookies.get("i18next") || 'fr';
  config.headers['X-localization'] = currentLang;
  return config;
});