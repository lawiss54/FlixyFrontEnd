import {axiosClient} from "./../../../Api/axios.jsx";


export const ClientApi = {
  
  refresh: async () => {
    return await axiosClient.get('refresh');
  },
  
  login: async (values) => {
    return await axiosClient.post('login', values);
  },
  
  register: async (values) => {
    return await axiosClient.post('register', values);
  },
  
  getUser: async () => {
    
    return await axiosClient.get('get-user');
  },
  
  resetPassword: async (values) => {
    return await axiosClient.post('update-password', values);
  },
  
  resetPasswordByOtp: async (values) => {
    return await axiosClient.post('reset-password', values);
  },
  
  getOtp: async () => {
    return await axiosClient.get('send-otp');
  },
  
  updateUser: async (values)=>{
    return await axiosClient.post('reset-password', values);
  },
  
  logout: async () => {
    return await axiosClient.post('logout');
  },
  
  getPlans: async (values) => {
    return await axiosClient.post('flixy/get-plans', values);
  },
  sendFlixy: async (values) => {
    return await axiosClient.post('flixy/send-flixy', values);
  },
  getOrders: async () => {
    return await axiosClient.get('flixy/get-orders');
  },
  checkOrder: async (values) => {
    return await axiosClient.post('flixy/check-order', values);
  },
  fondWallet: async (values) => {
    return await axiosClient.post('flixy/fond-wallet', values);
  },
  getPlansSubsc: async () => {
    return await axiosClient.get('subscription/get-plans-subscription');
  },
  subscriptionPay: async (values) => {
    return await axiosClient.post('subscription/pay', values);
  },
  getWalletTranc: async () => {
    return await axiosClient.get('flixy/get-wallet-histo');
  }
  
};