import react from "react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { motion } from "motion/react";
import {ContactUs} from "../components/AboutUs/ContactUs.jsx";
import {AboutUs} from "../components/AboutUs/AbouUs.jsx";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";


export const About = () => {
  const {t} = useTranslation();
  return (
    <>
    <Helmet>
        <title>{t('LaWiss | À propos de nous & Contactez-nous')}</title>
        <meta name="description" content={t("Rechargez votre téléphone au tarif de gros grâce à notre application Lawiss. Avec une commission aussi basse que 0,95. Que vous soyez propriétaire d'un magasin ou d'un salon de cosmétique, offrez un service de recharge et de remplissage de cartes sans avoir besoin de cartes SIM.")} />
    </Helmet>
    <motion.div 
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      
    >
    <AboutUs />
      <Card className="p-2 rounded-3xl drop-shadow-2xl bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 md:m-11 md:mt-52 ">
        <CardHeader>
          <CardTitle className="text-white">{t("Partagez Votre Idée")}</CardTitle>
          <CardDescription className="mt-2 text-white">{t("Nous serions ravis d'entendre vos idées. Partagez-les avec nous pour améliorer votre expérience.")}</CardDescription>
        </CardHeader>
        <CardContent>
          <ContactUs />
        </CardContent>
      </Card>
    </motion.div>
    </>
  );
};