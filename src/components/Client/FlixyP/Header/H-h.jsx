import react from "react";
import {useQueryClient} from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export const HeaderOfHeader = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]);
  const {t} = useTranslation();
  return (
    <>
      <div className=" ">
        <h2 className="text-[14px] md:text-[28px] text-white text-center"> {t('Salut')} <p className="inline-grid font-bold text-buttonMain"> {user.fname +' '+ user.lname} !</p> {t('Merci de nous rejoindre, profitez de nos services.')} </h2>
      </div>
      <hr className="border-gray-400"></hr>
    </>
  );
};