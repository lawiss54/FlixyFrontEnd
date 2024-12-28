import {useClientContext} from "../../Context/ClientContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import react  from 'react';
import {LOGIN_ROUTE} from "./../../Router/index.jsx";
import {Body} from "./../../components/Client/Profile/Body.jsx";
import { Toaster } from "@/components/ui/toaster";
import { Helmet } from "react-helmet-async";

export const Profile = () => {
  
  
  
  return (
    <>
    <Helmet>
        <title>{t('LaWiss | Profile')}</title>
        <meta name="description" content={t("Rechargez votre téléphone au tarif de gros grâce à notre application Lawiss. Avec une commission aussi basse que 0,95. Que vous soyez propriétaire d'un magasin ou d'un salon de cosmétique, offrez un service de recharge et de remplissage de cartes sans avoir besoin de cartes SIM.")} />
    </Helmet>
    <div className="grid grid-cols-12 grid-rows-6">
      <Body />
    </div>
      <Toaster />
    </>
  );
}