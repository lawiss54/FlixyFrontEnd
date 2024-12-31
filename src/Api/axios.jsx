import axios from 'axios';
import Cookies from 'js-cookie';

// إنشاء Axios Client
export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Authorization': `Bearer ${Cookies.get("authToken") || ''}`,
  },
});

axiosClient.defaults.withCredentials = true;

// Interceptors لإضافة التوكن الحالي لكل طلب
axiosClient.interceptors.request.use((config) => {
  const authToken = Cookies.get("authToken");
  config.headers['Authorization'] = `Bearer ${authToken}`;
  return config;
});

// Interceptors لمعالجة الاستجابات وتحديث التوكن
axiosClient.interceptors.response.use(
  (response) => {
    // التحقق من وجود التوكن الجديد في Header
    const authorizationHeader = response.headers['authorization'];
    if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
      // استخراج التوكن الجديد
      const refreshedToken = authorizationHeader.split(' ')[1];
      
      // تحديث التوكن في الكوكيز
      Cookies.set("authToken", refreshedToken, { expires: 7 }); // تخزين التوكن الجديد
    }
    return response;
  },
  (error) => {
    // معالجة الأخطاء الأخرى
    return Promise.reject(error);
  }
);