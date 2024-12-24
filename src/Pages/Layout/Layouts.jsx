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
        </>
      )
    }
   
  return (
    <>
      <Layout 
      style={{
        width: '100vw',
        height: '100vh',
      }}
      className="bg-[#DDE4EF]"
      >
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
            <HeaderNavbar />
        </Header>
        <Layout
            style={{
            width: '100%',
            height: '100%',
          }}
        >
          <Content style={{
            width: '100%',
            height: '100%',
            display: 'grid',
            placeItems: 'center',
            justifyContent: 'center',
            alignalignItems: 'center',
            }}
            className="bg-[#DDE4EF]"
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}