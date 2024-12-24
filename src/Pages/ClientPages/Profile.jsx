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
    <div className="md:p-40 p-10 col-span-12 row-span-6 row-start-2 ">
      <Body />
    </div>
      <Toaster />
    </>
  );
}