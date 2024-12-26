import {useClientContext} from "../../Context/ClientContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import react  from 'react';
import {LOGIN_ROUTE} from "./../../Router/index.jsx";
import {Header} from "./../../components/Client/Profile/Header.jsx";
import {Body} from "./../../components/Client/Profile/Body.jsx";
import { Toaster } from "@/components/ui/toaster";
 

export const Profile = () => {
  
  
  
  return (
    <>
    <div className="grid grid-cols-12 grid-rows-6">
      <Body />
    </div>
      <Toaster />
    </>
  );
}