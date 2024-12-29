import react from "react";
import {Contant} from "../../components/Client/Subscription/Contant.jsx";
import {useClientContext} from "../../Context/ClientContext.jsx";
import { useQuery } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { motion } from "motion/react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

export const Subscription = () => {
  const { t } = useTranslation();
  
  
  return(
    <>
    <Helmet>
        <title>{t('LaWiss | Acheter un abonnement')}</title>
        <meta name="description" content={t("Rechargez votre téléphone au tarif de gros grâce à notre application Lawiss. Avec une commission aussi basse que 0,95. Que vous soyez propriétaire d'un magasin ou d'un salon de cosmétique, offrez un service de recharge et de remplissage de cartes sans avoir besoin de cartes SIM.")} />
      </Helmet>
    <div className="md:mt-64 md:ml-10 md:mr-10">
      <Contant />
    </div>
    <Toaster />
    </>
  );
};