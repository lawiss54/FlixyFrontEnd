import {useState, useEffect, useRef} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import {HeaderNavbar} from "./Header.jsx";
import {useClientContext} from "../../Context/ClientContext.jsx";
import {FLIXY_ROUTE, ABOUT_ROUTE, LOGIN_ROUTE} from "../../Router/index.jsx";



export const Layouts = () => {
  
  const {Authentication} = useClientContext();
  const navigate = useNavigate();
  
  const { Header, Content, Footer, Sider } = Layout;
  
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  
  const [isLoading, setisLoading] = useState(false);
  
  
  useEffect(() => {
    if(Authentication){
      setisLoading(true);
      return navigate(FLIXY_ROUTE);
  }
  }, []);
  
   if(isLoading){
      return (
        <>
          <div className="min-h-screen flex items-center justify-center">
            <div className="relative w-12 h-12">
              <div className="absolute top-16 left-0 w-12 h-1.5 bg-[#65C7EB] rounded-full animate-shadow324"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tl from-blueFiroziD-100/90 via-blueFiroziD-400/90 to-blueFiroziD-600/70 rounded-md animate-jump7456"></div>
            </div>
          </div>
        </>
      )
    }
   
  return (
    <>
      <Layout className="min-h-screen overflow-x-hidden font-primary w-full bg-[#DDE4EF]" >
        <Header style={{
            position: 'sticky',
            top: '0',
            zIndex: '1000',
            backgroundColor: 'transparent',
            padding: '0',
            width: '100%',
            height: '100%',
            boxShadow: "0 8px 12px rgba(0, 0, 0, 0.3)",
          }}>
            <HeaderNavbar className="z-50" />
        </Header>
        
        <Layout className="bg-[#DDE4EF] overflow-x-hidden overflow-y-hidden  flex flex-col lg:flex-row h-auto">
          <Content 
            className="flex-1 p-4 sm:mb-6 mb-20 overflow-auto font-primary justify-center items-center place-items-center"
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}