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

export const ClientLayouts = () => {
  const { Authentication, logout, getUser } = useClientContext();
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

  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => await getUser(),
    staleTime: 5 * 60 * 1000,
    cacheTime: 2 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout className="min-h-screen w-full bg-[#DDE4EF]">
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
        <HeaderNavClient />
      </Header>

      {/* Main Content */}
      <Layout className="bg-[#DDE4EF] flex flex-col lg:flex-row h-full">
        {/* Sidebar */}
        

        <Content className="flex-1 p-4 mb-20">
          
          <Outlet />
        </Content>
      </Layout>

      {/* Bottom Bar for smaller screens */}
      <BottomBar className="fixed bottom-0 w-full shadow-lg" />
    </Layout>
  );
};