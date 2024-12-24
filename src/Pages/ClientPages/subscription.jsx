import react from "react";
import {Contant} from "../../components/Client/Subscription/Contant.jsx";
import {useClientContext} from "../../Context/ClientContext.jsx";
import { useQuery } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";

export const Subscription = () => {
  
  const {getPlansSubsc} = useClientContext();
  const { data: plans, isLoading } = useQuery({
    queryKey: ["plansSubc"],
    queryFn: async () => await getPlansSubsc(),
    staleTime: 5*60*1000,
    cacheTime: 2*60*1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  
  return(
    <>
    <div className="place-items-center translate-y-21 md:translate-y-[60%]">
      <Contant />
    </div>
    <Toaster />
    </>
  );
};