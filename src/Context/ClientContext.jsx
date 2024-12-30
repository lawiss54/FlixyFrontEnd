import {createContext, useContext, useState, useMemo} from "react";
import {ClientApi} from "./../Services/Api/Client/ClientApi.jsx";
import {LOGIN_ROUTE} from "./../Router/index.jsx";

import Cookies from 'js-cookie';

// create context
export const StaticContext = createContext({
  refresh: () => {},
  lineInfo: {},
  setLineInfo:{},
  getUser: () => {},
  getfee: () => {},
  getOtp: () => {},
  login: (values)=>{},
  register: (values)=>{},
  updateUser: (values)=>{},
  resetPassword: (values)=>{},
  resetPasswordByOtp: (values)=>{},
  Authentication: false,
  setAuthentication: () => {},
  logout: () => {},
  getPlans:(values) => {},
  setPlans: ()=>{},
  plans: {},
  sendFlixy:(values)=>{},
  getOrders:()=>{},
  Orders: {},
  Transactions: {},
  getWalletTranc: () => {},
  fondWallet: (values)=>{},
  subscriptionPay: (values)=>{},
  getPlansSubsc: ()=>{},
  lang:{},
  setLang: ()=>{},
  checkOrder: ()=>{}
});

function ClientContext({children}){
  // make hook useState for user data
  const [lineInfo, setLineInfo] = useState({});
  const [Orders, setOrders] = useState({});
  const [Transactions, setTransactions] = useState({});
  const [Authentication, _setAuthentication] = useState('true' === window.localStorage.getItem('Auth'));

  
  const [plans, setPlans] = useState({});
  
  const [lang, setLang] = useState(Cookies.get("i18next") || "fr");
  
  // make login
  const login = async(values) => {
    return ClientApi.login(values);
  };

  const refresh = async() => {
    return ClientApi.refresh();
  };

  const getUser = async () => {
    return ClientApi.getUser().then((res)=>{
      const data = res.data.data;
      return data;
    }).catch((err)=>{
          setAuthentication(false);
         return window.localStorage.removeItem('Auth');
    });
  };

  const resetPassword = async (values) => {
    return ClientApi.resetPassword(values);
  };

  const getOtp = async () => {
    return ClientApi.getOtp();
  };

  const resetPasswordByOtp = async (values) => {
    return ClientApi.resetPasswordByOtp(values);
  };

  const register = async (values) => {
    return ClientApi.register(values);
  };

  const updateUser = async (values) => {
    return ClientApi.updateUser(values);
  };

  const getPlans = async (values) => {
    return ClientApi.getPlans(values);
  };
  const getfee = async () => {
    return ClientApi.getfee();
  };

  const sendFlixy = async (values) => {
    return ClientApi.sendFlixy(values);
  };
  
  const checkOrder = async (values) => {
    return ClientApi.checkOrder(values);
  };

  const getOrders = async () => {
    return ClientApi.getOrders().then((res)=>{
       const orders = res.data.data.orders;
       const sortedOrders = orders.sort((a, b) => {
         const dateA = new Date(a.created_at);
         const dateB = new Date(b.created_at);
         return dateB - dateA; // ترتيب تنازلي
      });
      setOrders(sortedOrders);
      return sortedOrders;
    });
  };
  const getWalletTranc = async () => {
    return ClientApi.getWalletTranc().then((res)=>{
       const transactions = res.data.data.transactions;
       const sortedTransactions = transactions.sort((a, b) => {
         const dateA = new Date(a.created_at);
         const dateB = new Date(b.created_at);
         return dateB - dateA; // ترتيب تنازلي
      });
      setTransactions(sortedTransactions);
      return sortedTransactions;
      
    });
  };

  const fondWallet = async(values) =>{
    return ClientApi.fondWallet(values);
  };
  
  const getPlansSubsc = async () => {
    return ClientApi.getPlansSubsc();
  };
  const subscriptionPay = async (values) => {
    return ClientApi.subscriptionPay(values);
  };
  
  // make function for logout
  const logout = async () => {
     return ClientApi.logout().then((res)=>{
       
       setAuthentication(false);
       window.localStorage.removeItem('Auth');
     });
  };

  const setAuthentication = (isAuthentication) => {
    _setAuthentication(isAuthentication);
    window.localStorage.setItem('Auth', isAuthentication );
    
  };
  
  
  return(
    <StaticContext.Provider value={{
      getUser,
      updateUser,
      login,
      logout,
      register,
      Authentication,
      setAuthentication,
      resetPassword,
      getOtp,
      resetPasswordByOtp,
      refresh,
      getPlans,
      getfee,
      sendFlixy,
      getOrders,
      Orders,
      fondWallet,
      getPlansSubsc,
      subscriptionPay,
      setPlans,
      plans,
      setLineInfo,
      lineInfo,
      lang,
      setLang,
      checkOrder,
      Transactions,
      getWalletTranc
    }} >
      {children}
    </StaticContext.Provider>
  )
};

export {ClientContext};
//export {login};

export const useClientContext = () => useContext(StaticContext);