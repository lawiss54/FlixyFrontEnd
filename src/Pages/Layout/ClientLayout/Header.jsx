import React, { useState, useEffect } from "react";
import "../../../index.css";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User} from "@nextui-org/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {HeaderLogo} from "../../../assets/HeaderLogo.jsx";
import { Loader, LogIn } from "lucide-react";
import {FLIXY_ROUTE, ABOUT_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, WALLET_ROUTE, TABLE_ROUTE} from "../../../Router/index.jsx";
import {useClientContext, StaticContext} from "../../../Context/ClientContext.jsx";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import Flag from 'react-flagkit';
import { Languages } from 'lucide-react';
import i18n from "i18next";
import Cookies from 'js-cookie';


export const HeaderNavClient = () => {
  
  const {t} = useTranslation();
  const {Authentication, setLang, logout, lang} = useClientContext();
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleLanguageChange = (lang) => {
      setLang(Cookies.get("i18next") || 'fr'); // تحديث اللغة في الحالة
      document.documentElement.dir = i18n.dir(lang); // تحديث اتجاه النص بناءً على اللغة
    };

  // الاشتراك في الحدث عند تغيير اللغة
  i18n.on("languageChanged", handleLanguageChange);

  // تعيين الاتجاه في البداية عند تحميل الصفحة
  document.documentElement.dir = i18n.dir(lang);

  return () => {
    // تنظيف الاشتراك عند إلغاء تحميل المكون
    i18n.off("languageChanged", handleLanguageChange);
  
    
  };
}, [lang]);
  
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]);
  
  
  let ChangeStatus = (path) => {
    let location = useLocation();
    if (location.pathname === path){
      return true;
    }else{
      return false;
    }
  };
  
  


  return (
    <header className="w-full fixed top-0">
      <Navbar isBordered classNames="w-full">
        <NavbarBrand justify="start">
          <HeaderLogo />
          <p>Flixy</p>
        </NavbarBrand>
        <NavbarContent className="hidden xs-sm:flex">
          <NavbarItem isActive={ChangeStatus(FLIXY_ROUTE)}>
            <Link color="foreground" to={FLIXY_ROUTE}>
              {t("Flixy")}
            </Link>
          </NavbarItem>
          <NavbarItem isActive={ChangeStatus(ABOUT_ROUTE)}>
            <Link color="foreground" to={ABOUT_ROUTE}>
              {t("Votre avis")}
            </Link>
          </NavbarItem>
          <NavbarItem isActive={ChangeStatus(ABOUT_ROUTE)}>
            <Link color="foreground" to={WALLET_ROUTE}>
              {t("Portefeuille")}
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end" className="w-auto">
          <NavbarItem>
            <Dropdown placement="bottom-start" className="bg-white/90"  >
              <DropdownTrigger>
                <Button variant="bordered"><Languages /> {t("Langue")}</Button>
              </DropdownTrigger>
              <DropdownMenu onAction={(key) => i18n.changeLanguage(key)}>
                <DropdownItem className="flex items-center space-x-2" key="ar">
                  <Flag className="inline" country="DZ" />
                  <span>{t("Arabe")}</span>
                </DropdownItem>
                 <DropdownItem className="flex items-center space-x-2" key="fr"><Flag className="inline" country="FR" /> <span>{t("Français")}</span></DropdownItem>
      
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end" className="w-auto">
          <NavbarItem>
            <Dropdown placement="bottom-start">
              <DropdownTrigger>
                <User
                  as="button"
                  avatarProps={{
                    isBordered: true,
                    src: "https://avatar.iran.liara.run/public",
                  }}
                  
                  className="transition-transform "
                  description={
                    <p className="xs:hidden">{user.email}</p>
                    
                  }
                  name={
                    <p className="xs:hidden">
                      {user.fname + " " + user.lname}
                    </p>
                  }
                />
              </DropdownTrigger>
              <DropdownMenu variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-bold  ">{t("Connecté en tant que")}</p>
                  <p className="font-bold ">{user.fname + " " + user.lname}</p>
                </DropdownItem>
                <DropdownItem aria-label="Profile" key={PROFILE_ROUTE}>
                  <Link to={PROFILE_ROUTE} aria-current="page">
                    {t("Profile")}
                  </Link>
                </DropdownItem>
                <DropdownItem aria-label="table" key={TABLE_ROUTE}>
                  <Link to={TABLE_ROUTE} aria-current="page">
                    {t("Liste des tarifs")}
                  </Link>
                </DropdownItem>
                <DropdownItem onClick={logout}>{t("Déconnexion")}</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>
        
      </Navbar>
    </header>
    
    
  );

  
  
  
}



