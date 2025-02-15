import { Dock, DockIcon } from "@/components/ui/dock";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FLIXY_ROUTE, PROFILE_ROUTE, WALLET_ROUTE, SUBSCRIPTION_ROUTE, ABOUT_ROUTE } from "../../Router/index.jsx";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

export const BottomBar = () => {
  const { t } = useTranslation();

  const Menus = [
    { name: t("Profil"), icon: "finger-print-outline", path: PROFILE_ROUTE },
    { name: t("Solde"), icon: "wallet-outline", path: WALLET_ROUTE },
    { name: t("Flixy"), icon: "apps-outline", path: FLIXY_ROUTE },
    { name: t("Abonnement"), icon: "key-outline", path: SUBSCRIPTION_ROUTE },
    { name: t("Contact"), icon: "mail-outline", path: ABOUT_ROUTE },
  ];

  const [active, setActive] = useState(2);
  const location = useLocation();

  

  return (
    
  
    <div className="fixed bottom-0 left-0 right-0 z-60 bg-transparent w-full px-6 sm:px-10 lg:px-20 rounded-t-xl shadow-md">
  <Dock iconMagnification={70} iconDistance={140}  className="w-full">
    <DockIcon  className="drop-shadow-2xl bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 text-black dark:bg-white/10 opacity-85 hover:animate-gradient">
      <Link to={PROFILE_ROUTE} className="hover:text-white hover:scale-150">
        <ion-icon name="finger-print-outline"></ion-icon>
      </Link>
    </DockIcon>
    <DockIcon className="drop-shadow-2xl bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 text-black dark:bg-white/10 hover:animate-gradient">
      <Link to={WALLET_ROUTE} className="hover:text-white hover:scale-150">
        <ion-icon name="wallet-outline"></ion-icon>
      </Link>
    </DockIcon>
    <DockIcon className="drop-shadow-2xl bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 text-black dark:bg-white/10 hover:animate-gradient">
      <Link to={FLIXY_ROUTE} className="hover:text-white hover:scale-150">
        <ion-icon name="apps-outline"></ion-icon>
      </Link>
    </DockIcon>
    <DockIcon className="drop-shadow-2xl bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 text-black  dark:bg-white/10 hover:animate-gradient">
      <Link to={SUBSCRIPTION_ROUTE} className="hover:text-white hover:scale-150">
        <ion-icon name="key-outline"></ion-icon>
      </Link>
    </DockIcon>
    <DockIcon className="drop-shadow-2xl bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 text-black dark:bg-white/10 hover:animate-gradient">
      <Link to={ABOUT_ROUTE} className="hover:text-white hover:scale-150">
      <ion-icon  name="mail-outline"></ion-icon>
      </Link>
    </DockIcon>
  </Dock>
</div>
  
  );
};