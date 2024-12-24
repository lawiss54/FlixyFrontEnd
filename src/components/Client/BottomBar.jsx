import React, { useState } from "react";
import { Link } from "react-router-dom";
import {PROFILE_ROUTE, WALLET_ROUTE, FLIXY_ROUTE, SUBSCRIPTION_ROUTE, ABOUT_ROUTE} from "./../../Router/index.jsx";

export const BottomBar = () => {
  const Menus = [
    
    { name: "Profile", icon: "finger-print-outline", dis: "translate-x-0" },
    { name: "Wallet", icon: "wallet-outline", dis: "translate-x-16" },
    { name: "Flixy", icon: "apps-outline", dis: "translate-x-32" },
    { name: "Subscription", icon: "key-outline", dis: "translate-x-48" },
    { name: "Contact", icon: "mail-outline", dis: "translate-x-64" },
  ];
  const [active, setActive] = useState(3);
  return (
    <div className="fixed bottom-0 bg-white w-full max-h-[4.4rem] px-14 rounded-t-xl">
      <ul className="flex relative content-center text-center">
        <span
          className={`bg-rose-600 duration-500 ${Menus[active].dis} border-4 border-gray-900 h-16 w-16 absolute -top-5 rounded-full`} >
          <span className="w-3.5 h-3.5 bg-transparent absolute top-4 -left-[18px] rounded-tr-[11px] shadow-myShadow1"></span>
          <span className="w-3.5 h-3.5 bg-transparent absolute top-4 -right-[18px]  rounded-tl-[11px] shadow-myShadow2" ></span>
        </span>
        {Menus.map((menu, i) => (
          
          <li key={i} className="w-16">
            <a
              className="flex flex-col text-center pt-6"
              onClick={() => setActive(i)}
            >
              <span
                className={`text-xl cursor-pointer duration-500 ${
                  i === active && "-mt-6 text-white"
                }`}
              >
                <ion-icon name={menu.icon}></ion-icon>
              </span>
              <span
                className={` ${
                  active === i
                    ? "translate-y-4 duration-700 opacity-100"
                    : "opacity-0 translate-y-10"
                } `}
              >
                {menu.name}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

  
  
  