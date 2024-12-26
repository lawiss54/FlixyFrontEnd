
import React, { useState, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { useClientContext } from "../../../Context/ClientContext.jsx";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/use-toast";

function Contant() {
  const {t} = useTranslation();
  const queryClient = useQueryClient();
  const getData = queryClient.getQueryData(["plansSubc"]);
  const plans = getData?.data?.plans;

  const { subscriptionPay } = useClientContext();
  const navigate = useNavigate();

  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  const [isLoading, setIsLoading] = useState(false);

  const handlingButton = async (key) => {
    setIsLoading(true); // تفعيل حالة التحميل
    let data = {
      id: key,
    };
    try {
      const res = await subscriptionPay(data);
      setIsLoading(false); // إيقاف حالة التحميل
      const url = res.data.url;
      window.open(url); // فتح الرابط
    } catch (e) {
      setIsLoading(false); // إيقاف حالة التحميل في حال الخطأ
      toast({
          variant: e.response.data.alert.type,
          title: e.response.data.alert.title,
          description: e.response.data.alert.message
      });
    }
  };

  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
          <div className="flex flex-col border border-primary rounded-xl overflow-hidden bg-primary/5">
            <div className="text-center text-white pt-10 border-1 border-gray-400 rounded-b-2xl drop-shadow-2xl">
              <h5 className="text-xl font-medium">Basic Plan</h5>
              <h2 className="text-5xl mt-8 mb-3 items-center align-middle">
                <sup className="text-2xl align-middle">{t('DA')}</sup>3000
                <span className="text-lg font-medium">{t(" / 1 Mois")}</span>
              </h2>
            </div>

            <div className="p-10">
              <ul className="mb-10 text-center text-white border-1 rounded border-gray-400 drop-shadow-2xl">
                <li className="flex items-center justify-center py-2">
                  
                    <h3 className="pl-2 pr-2 font-semibold">{t("Pas besoin de sim Flexy pour travailler ! Profitez des recharges avec des frais réduits jusqu'à 0,95, soit 1000 DZD pour 950 DZD.")}</h3>
                  </li>
                <li className="flex items-center justify-center py-2">
                  <ion-icon name="shield-checkmark-outline"></ion-icon>
                    <h5 className="pl-2 pr-2 font-medium">{t("Flixy Djezzy")}</h5>
                  </li>
                  <li className="flex items-center justify-center py-2">
                    <ion-icon name="shield-checkmark-outline"></ion-icon>
                    <h5 className="pl-2 pr-2 font-medium">{t("Flixy Mobilis")}</h5>
                  </li>
                  <li className="flex items-center justify-center py-2">
                    <ion-icon name="shield-checkmark-outline"></ion-icon>
                    <h5 className="pl-2 pr-2 font-medium">{t("Flixy Ooredoo")}</h5>
                  </li>
                  <li className="flex items-center justify-center py-2">
                    <ion-icon name="shield-checkmark-outline"></ion-icon>
                    <h5 className="pl-2 pr-2 font-medium">{t("Recharge ADSL")}</h5>
                  </li>
                  <li className=" flex items-center justify-center py-2">
                    <ion-icon name="shield-checkmark-outline"></ion-icon>
                    <h5 className="pl-2 pr-2 font-medium">{t("Recharge 4G")}</h5>
                  </li>
                </ul>
              <div className="flex justify-center">
              <button onClick={handlingButton} className="py-3 px-6 font-medium  font-semibold border rounded-md border-primary hover:border-primary text-white bg-primary hover:bg-white hover:text-primary transition-all duration-500">
                {t('Souscrivez sans attendre !')}
              </button>
            </div>
          </div>
        </div>
        </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export { Contant };