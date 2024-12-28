import react from "react";
import {Contant} from "../../components/Client/Subscription/Contant.jsx";
import {useClientContext} from "../../Context/ClientContext.jsx";
import { useQuery } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { motion } from "motion/react";

export const Subscription = () => {
  
  
  
  return(
    <>
    <div className="md:mt-64 md:ml-10 md:mr-10">
      <Contant />
    </div>
    <Toaster />
    </>
  );
};