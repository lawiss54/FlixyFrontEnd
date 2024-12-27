import react from "react";
import {Contant} from "../../components/Client/Subscription/Contant.jsx";
import {useClientContext} from "../../Context/ClientContext.jsx";
import { useQuery } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { motion } from "motion/react";

export const Subscription = () => {
  
  
  
  return(
    <>
    <motion.div 
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 2 }}
      className="grid grid-cols-1 gap-10 md:w-[80%] md:m-20 rounded-2xl bg-gradient-to-b from-[#3289f0] to-[#3e56f0]  ">
      <Contant />
    </motion.div>
    <Toaster />
    </>
  );
};