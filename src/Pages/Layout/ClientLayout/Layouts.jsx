import { Outlet } from "react-router-dom";
import { useClientContext } from "../../../Context/ClientContext.jsx";
import { LOGIN_ROUTE } from "../../../Router/index.jsx";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "antd";
import { useToast } from "@/hooks/use-toast";
import { HeaderNavClient } from "../ClientLayout/Header.jsx";
import { useQuery } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BottomBar } from "../../../components/Client/BottomBar.jsx";
import Cookies from 'js-cookie';
import * as motion from "motion/react-client";

export const ClientLayouts = () => {
  const { Authentication, logout, getUser, refresh } = useClientContext();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { Header, Content } = Layout;

  const [isSidebarVisible, setSidebarVisible] = useState(true);

  useEffect(() => {
    if (!Authentication) {
      logout();
      return navigate(LOGIN_ROUTE);
    }
  }, [Authentication]);
  
  
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user"],
    queryFn: () => {return  getUser()},
    staleTime: 5 * 60 * 1000,
    cacheTime: 2 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  
  if(isError){
    window.localStorage.removeItem('Auth');
    return navigate(LOGIN_ROUTE);
  }
  
  if (isLoading) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.5, easing: "ease-in-out"}}
            className="relative w-12 h-12">
            <motion.div 
              initial={{scaleX: 1, originX: 0.5}}
              animate={{ scaleX: [1, 3, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatType: "loop"  }}
              className="absolute top-16 left-0 w-12 h-1.5 bg-[#65C7EB] rounded-full">
            </motion.div>
            <motion.div
              initial={{y: 0}}
              animate={{ rotate: 360, y:[0 , -50, 0] }}
              transition={{ duration: 1, repeat: Infinity, repeatType: "loop"  }}
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-tl from-blueFiroziD-100/90 via-blueFiroziD-400/90 to-blueFiroziD-600/70 rounded-md"></motion.div>
          </motion.div>
        </div>
      </>
    );
  }

  
  

  

  return (
    <Layout className="min-h-screen font-primary w-full bg-[#DDE4EF]">
      {/* Header */}
      <Header style={{
            position: 'sticky',
            top: '0',
            zIndex: '1000',
            backgroundColor: 'transparent',
            padding: '0',
            width: '',
            height: '',
            boxShadow: "0 8px 12px rgba(0, 0, 0, 0.3)",
          }}>
        <HeaderNavClient className="z-50" />
      </Header>

      {/* Main Content */}
      <Layout className="bg-[#DDE4EF] flex flex-col lg:flex-row h-full">
        {/* Sidebar */}
        

        <Content className="flex-1 p-4 mb-20 overflow-auto">
          
          <Outlet />
        </Content>
      </Layout>

      {/* Bottom Bar for smaller screens */}
      <BottomBar className="fixed bottom-0 w-full shadow-lg z-50" />
    </Layout>
  );
};