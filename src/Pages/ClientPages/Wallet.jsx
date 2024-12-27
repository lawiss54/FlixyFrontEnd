import react from "react";
import {Contant} from "../../components/Client/WalletP/Contant.jsx";
import { motion } from "motion/react";
import { Toaster } from "@/components/ui/toaster";
import { useQuery } from "@tanstack/react-query";
import { useClientContext} from "../../Context/ClientContext.jsx";

export const Wallet = () => {
  
  
  
  const {getWalletTranc} = useClientContext();
  const { data: transactions, refetch, isSuccess, isError } = useQuery({
  queryKey: ["transactions"],
  queryFn: () => {
    return  getWalletTranc()
  },
  staleTime: 5 * 60 * 1000,
  cacheTime: 2 * 60 * 1000,
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  retry: 2,
  onSuccess: (data) => {
    console.log("Data fetched successfully:", data);
  },
  onError: (error) => {
    console.error("Error fetching data:", error);
  },
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