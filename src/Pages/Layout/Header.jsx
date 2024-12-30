//import Dropdown from '../../../../../app/vendor/laravel/breeze/stubs/inertia-react-ts/resources/js/Components/Dropdown';

import React, { useState, useEffect } from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Loader, LogIn } from "lucide-react";
import Flag from 'react-flagkit';
import { Languages } from 'lucide-react';
import "../../index.css";
import {HeaderLogo} from "../../assets/HeaderLogo.jsx";
import {FLIXY_ROUTE, ABOUT_ROUTE, REGISTER_ROUTE, LOGIN_ROUTE} from "../../Router/index.jsx";
import {useClientContext} from "../../Context/ClientContext.jsx";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import Cookies from 'js-cookie';



export const HeaderNavbar = () => {
  
  const {setLang, lang} = useClientContext();
  React.useEffect(() => {
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
  
  
  
  const {t} = useTranslation();
  
  
  
  
  let ChangeStatus = (path) => {
    let location = useLocation();
    if (location.pathname === path){
      return true;
    }else{
      return false;
    }
  };
  
  return (
      <>
        <Navbar className="h-[100%]">
          <NavbarBrand>
            <HeaderLogo />
            <p className="font-bold text-inherit">Flixy</p>
          </NavbarBrand>
          <NavbarContent className="hidden sm:flex gap-4 sm:gab-1" justify="center">
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
          </NavbarContent>
          <NavbarContent className="w-auto">
          <NavbarItem>
            <Dropdown className=" sm:space-x-10 bg-white/50"  >
              <DropdownTrigger>
                <Button variant="bordered" className="" ><Languages /> {t("Langue")}</Button>
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
          <NavbarContent justify="end">
            <NavbarItem className="hidden sm:flex" >
              <Button as={Link} to={LOGIN_ROUTE} variant="flat" className="inline-flex items-center px-2 py-2.5 text-sm font-medium sm:font-extralight text-center text-white bg-blue-700 rounded-2xl hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-20">
               <LogIn /> {t("Se connecter")}
              </Button>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      </>
  );
}