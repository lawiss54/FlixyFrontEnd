import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FLIXY_ROUTE, PROFILE_ROUTE, WALLET_ROUTE, SUBSCRIPTION_ROUTE, ABOUT_ROUTE } from "../../Router/index.jsx";
import i18next from 'i18next'; // استخدام مكتبة i18next

export const BottomBar = () => {
  const Menus = [
    { name: "Profile", icon: "finger-print-outline", dis: "translate-x-0", disRtl: "translate-x-[0%]", path: PROFILE_ROUTE },
    { name: "Wallet", icon: "wallet-outline", dis: "translate-x-[120%] md:translate-x-[325%]", disRtl: "translate-x-[-120%] md:translate-x-[-325%]", path: WALLET_ROUTE },
    { name: "Flixy", icon: "apps-outline", dis: "translate-x-[242%] md:translate-x-[654%]", disRtl: "translate-x-[-242%] md:translate-x-[-654%]", path: FLIXY_ROUTE },
    { name: "Subscription", icon: "key-outline", dis: "translate-x-[374%] md:translate-x-[980%]", disRtl: "translate-x-[-374%] md:translate-x-[-980%]", path: SUBSCRIPTION_ROUTE },
    { name: "Contact", icon: "mail-outline", dis: "translate-x-[485%] md:translate-x-[1305%]", disRtl: "translate-x-[-485%] md:translate-x-[-1305%]", path: ABOUT_ROUTE },
  ];

  const [active, setActive] = useState(2); // القيمة الافتراضية هي الأيقونة رقم 2 (Flixy)
  const [isRTL, setIsRTL] = useState(i18next.language === "ar"); // التعيين الأولي بناءً على اللغة

  const location = useLocation(); // الحصول على المسار الحالي

  useEffect(() => {
    // تحديث حالة active بناءً على المسار الحالي
    const currentPath = location.pathname;
    const activeMenu = Menus.findIndex(menu => menu.path === currentPath);
    if (activeMenu !== -1) {
      setActive(activeMenu);
    }
  }, [location]); // يتم التحديث عند تغيير المسار

  useEffect(() => {
    const handleLanguageChange = (lng) => {
      setIsRTL(lng === "ar"); // تغيير قيمة isRTL حسب اللغة
    };

    i18next.on('languageChanged', handleLanguageChange); // مراقبة تغييرات اللغة

    return () => {
      i18next.off('languageChanged', handleLanguageChange); // إزالة المراقبة عند فك التثبيت
    };
  }, []); // لن يتم تشغيلها إلا مرة واحدة عند التثبيت

  return (
    <div className="z-60 fixed bottom-0 bg-white w-full max-h-[4.4rem] px-6 sm:px-10 lg:px-20 rounded-t-xl shadow-md">
      <ul className="flex justify-between items-center relative w-full">
        {/* العنصر الدائري المتحرك */}
        <span
          className={`bg-gradient-to-tl from-blue-300/90 via-blue-500/90 to-blue-700/70 duration-500 ${
            isRTL ? Menus[active].disRtl : Menus[active].dis
          } border-4 border-[#DDE4EF] h-16 w-16 absolute -top-5 rounded-full flex items-center justify-center`}
        >
          <span className="w-3.5 h-3.5 bg-transparent absolute top-4 -left-[18px] rounded-tr-[11px] shadow-myShadow1"></span>
          <span className="w-3.5 h-3.5 bg-transparent absolute top-4 -right-[18px] rounded-tl-[11px] shadow-myShadow2"></span>
        </span>

        {/* القوائم */}
        {Menus.map((menu, i) => (
          <li key={i} className="w-16 flex justify-center items-center">
            <Link to={menu.path}>
              <a
                className="flex flex-col items-center text-center pt-6"
                onClick={() => setActive(i)} // تغيير القيمة عند الضغط
              >
                {/* الأيقونة */}
                <span
                  className={`cursor-pointer duration-500 ${i === active && "-mt-9 text-white"} text-xl lg:text-2xl xl:text-3xl`}
                >
                  <ion-icon name={menu.icon}></ion-icon>
                </span>
                {/* النص */}
                <span
                  className={`${
                    active === i
                      ? "translate-y-2 duration-700 opacity-100"
                      : "opacity-0 translate-y-10"
                  } text-sm lg:text-base`}
                >
                  {menu.name}
                </span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};