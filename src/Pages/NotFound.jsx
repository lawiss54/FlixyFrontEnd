import { Helmet } from "react-helmet-async";


export const NotFound = () => {
  return (
    <>
    <Helmet>
        <title>{t('LaWiss | Page introuvable')}</title>
        <meta name="description" content={t("Rechargez votre téléphone au tarif de gros grâce à notre application Lawiss. Avec une commission aussi basse que 0,95. Que vous soyez propriétaire d'un magasin ou d'un salon de cosmétique, offrez un service de recharge et de remplissage de cartes sans avoir besoin de cartes SIM.")} />
    </Helmet>
    <p> NotFound </p>
    </>
  );
}