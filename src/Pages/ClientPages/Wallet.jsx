import react from "react";
import {Contant} from "../../components/Client/WalletP/Contant.jsx";
import { motion } from "motion/react";
import { Toaster } from "@/components/ui/toaster";
import { useQuery } from "@tanstack/react-query";
import { useClientContext} from "../../Context/ClientContext.jsx";

export const Wallet = () => {
  
  const {getWalletTranc} = useClientContext();
  const { data: transactions, refetch } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => await getWalletTranc(),
    staleTime: 5 * 60 * 1000,
    cacheTime: 2 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  return(
    <>
    <div className="md:mt-64 md:ml-10 md:mr-10">
      <Contant />
    </div>
    <Toaster />
    </>
  )
};