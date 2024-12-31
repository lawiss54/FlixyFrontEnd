import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Image } from 'cloudinary-react';
import { Link } from "react-router-dom";
import {FLIXY_ROUTE} from "../Router/index.jsx";

export const NotFound = () => {
  const {t} = useTranslation();
  
  return (
    <>
    <Helmet>
        <title>{t('LaWiss | Page introuvable')}</title>
        <meta name="description" content={t("Rechargez votre téléphone au tarif de gros grâce à notre application Lawiss. Avec une commission aussi basse que 0,95. Que vous soyez propriétaire d'un magasin ou d'un salon de cosmétique, offrez un service de recharge et de remplissage de cartes sans avoir besoin de cartes SIM.")} />
    </Helmet>
      <div className="mt-20" >
        <Image cloudName="dghhd8mf2" publicId="Flixy/s3po29pcfvsyzuslr8s6" width="1090" crop="scale" />
        <div className="text-center font-mono text-4xl -rotate-12">
          {t('Page introuvable')}
          </div>
        <div className="text-center mt-7 underline text-amber-900">
        <Link to={FLIXY_ROUTE}>
          {t('Revenir en arrière')}
          
        </Link>
        </div>
      </div>
    </>
  );
}