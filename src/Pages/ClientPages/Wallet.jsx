import react from "react";
import {Contant} from "../../components/Client/WalletP/Contant.jsx";
import { motion } from "motion/react";
import { Toaster } from "@/components/ui/toaster";
import { useQuery } from "@tanstack/react-query";
import { useClientContext} from "../../Context/ClientContext.jsx";
import { Helmet } from "react-helmet-async";


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
});
  
  return(
    <>
    <Helmet>
        <title>{t('LaWiss | Rechargez votre portefeuille')}</title>
        <meta name="description" content={t("Rechargez votre téléphone au tarif de gros grâce à notre application Lawiss. Avec une commission aussi basse que 0,95. Que vous soyez propriétaire d'un magasin ou d'un salon de cosmétique, offrez un service de recharge et de remplissage de cartes sans avoir besoin de cartes SIM.")} />
    </Helmet>
    <div className="md:mt-64 md:ml-10 md:mr-10">
      <Contant />
    </div>
    <Toaster />
    </>
  )
};