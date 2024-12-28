import {UserRegister} from "./../../components/Auth/UserRegister.jsx";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LogIn } from "lucide-react";
import {LOGIN_ROUTE, PROFILE_ROUTE} from "./../../Router/index.jsx";
import {useEffect} from "react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

export const Register = () => {
  
  const {t} = useTranslation();
  return (
    <>
    <Helmet>
        <title>{t('LaWiss | Inscription')}</title>
        <meta name="description" content={t("Rechargez votre téléphone au tarif de gros grâce à notre application Lawiss. Avec une commission aussi basse que 0,95. Que vous soyez propriétaire d'un magasin ou d'un salon de cosmétique, offrez un service de recharge et de remplissage de cartes sans avoir besoin de cartes SIM.")} />
    </Helmet>
    <motion.div 
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="m-8 md:m-32 md:mx-56 "
    >
      <Card className="rounded-3xl drop-shadow-2xl bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500">
        <CardHeader>
          <CardTitle className="text-white text-lg pb-5">{t("Inscription")}</CardTitle>
          <CardDescription className="text-white">{t("Remplissez les informations ci-dessous pour créer votre compte et accéder à tous nos services.")}</CardDescription>
        </CardHeader>
        <CardContent>
          <UserRegister />
        </CardContent>
        <CardFooter className="grid place-items-center">
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "#FCD34D" }}
            whileTap={{ scale: 0.95, rotate: 2 }}
            className="flex items-center justify-center gap-2 text-white bg-blue-700 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            <Link to={LOGIN_ROUTE} className="flex items-center gap-2">
              <LogIn />
              {t("Accéder à mon compte")}
            </Link>
          </motion.button>
        </CardFooter>
      </Card>
    </motion.div>
    </>
  );
}