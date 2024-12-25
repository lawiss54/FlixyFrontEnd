import React from "react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import AboutUsFirst from "../../assets/about-us-1.png";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

export const AboutUs = () => {
  const {t} = useTranslation();
  return(
    <>
    <div className="z-1 w-full mb-4 bg-[#65C7EB] rounded-b-2xl">
      <AspectRatio ratio={16 / 9}>
        <Card className="z-3 h-full grid grid-cols-12 grid-rows-6 rounded-b-2xl drop-shadow-lg bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
          <div 
            className="z-2 col-span-6 row-span-6">
              <motion.img 
              initial={{ opacity: 0, scale:0 }}
              animate={{ x: 10, opacity: 1, scale:1 }}
              transition={{ ease: "easeOut", duration: 1 }}
              className="items-center drop-shadow-2xl" src="https://doodleipsum.com/700/flat?i=e536a9b352c69c886a7c1e147f726aa4" />
          </div>
          <div className="row-span-5 mt-5 ml-2 mr-2 col-span-6 drop-shadow-lg bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
            <div className="text-center text-[1rem] font-bold p-1">
              <h2>{t('Contactez-nous')}</h2>
            </div>
            <div className="pt-3 pl-1 pr-1">
              <div className=" block">
                <h3 className="font-bold inline-block text-[11px]"><ion-icon className="pt-2" name="location-outline"></ion-icon> {t("Adresse :")}</h3><p className="inline-block pl-1 text-gray-900 text-[9px]">{t("Ramdan djamel - Skikda") } </p>
              </div>
              <div className="block">
                <h3 className="font-bold inline-block text-[11px]"><ion-icon className="pt-2" name="call-outline"></ion-icon> {t("Téléphone :")}</h3><p className="inline-block pl-1 text-gray-900 text-[9px]"> {t("0794547080")} </p>
              </div>
              <div className=" block">
                <h3 className="font-bold inline-block text-[11px]"><ion-icon className="pt-2" name="mail-outline"></ion-icon> {t("Email :")}</h3><p className="inline-block pl-1 text-gray-900 text-[9px]"> {t("smmlawiss@outlook.com")} </p>
              </div>
              <div className=" block">
                <h3 className="font-bold inline-block text-[11px]"><ion-icon className="pt-2" name="person-outline"></ion-icon> {t("Responsable :")}</h3><p className="inline-block pl-1 text-gray-900 text-[9px]"> {t("Ouaddah Cherif") } </p>
              </div>
            </div>
          </div>
        </Card>
      </AspectRatio>
    </div>
    </>
  )
}