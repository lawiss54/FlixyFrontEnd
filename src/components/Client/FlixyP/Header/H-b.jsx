import react from "react";
import {WalletIcon} from "../assets/WalletIcon.jsx";
import { Toggle } from "@/components/ui/toggle";
import {useQueryClient} from "@tanstack/react-query";
import {WALLET_ROUTE} from "../../../../Router/index.jsx";
import { Link} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";

export const BodyOfHeader = () => {
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData(["user"]);
  const user = userData.data ;
  
  const {t} = useTranslation();
  return(
    <>
      <div className="grid grid-cols-4 grid-rows-2 gap-1">
        <motion.div 
          initial={{ opacity: 0, scale:0 }}
          animate={{ x: 5, opacity: 1, scale:1 }}
          transition={{ ease: "easeOut", duration: 1 }}
          className=" col-span-2 row-span-2 place-content-center text-center rounded-full bg-white bg-opacity-30 backdrop-blur-lg border place-items-center border-white/30 shadow-lg m-5 p-4">
          <h2 className=" text-center text-[24px] md:text-[30px] font-extrabold text-black ">
            {user.balance} {t('DA')}
          </h2>
        </motion.div>
        <div className="col-span-2 row-span-2 place-content-center text-center">
        <Link to={WALLET_ROUTE} className="flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale:0 }}
            animate={{ x: 5, opacity: 1, scale:1 }}
            transition={{ ease: "easeOut", duration: 1 }}
            className="rounded-full bg-white bg-opacity-30 backdrop-blur-lg border border-white/30 shadow-lg m-5 p-4 flex items-center justify-center">
              <WalletIcon />
          </motion.div>
          </Link>
        </div>
      </div>
      
    </>
  );
}