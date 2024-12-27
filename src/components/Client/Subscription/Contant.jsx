
import React, { useState, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Loader2 } from "lucide-react";
import Cookies from 'js-cookie';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useClientContext } from "../../../Context/ClientContext.jsx";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/use-toast";

function Contant() {
  const {t, i18n} = useTranslation();
  const {getPlansSubsc} = useClientContext();
  
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["plans"],
    queryFn: async () => await getPlansSubsc(),
    staleTime: 5*60*1000,
    cacheTime: 2*60*1000,
    
  });
    
  
  const {toast} = useToast();
  const { subscriptionPay } = useClientContext();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
   
   
  
   
  const handlingButton = async (e) => {
     setIsSubmitting(true);
    const key = e.currentTarget.getAttribute('data-key');
     // تفعيل حالة التحميل
    let data = {
      id: key,
    };
    try {
      const res = await subscriptionPay(data);
       // إيقاف حالة التحميل
      const url = res.data.url;
      setIsSubmitting(false);
      window.open(url); // فتح الرابط
    } catch (e) {
      setIsSubmitting(false); // إيقاف حالة التحميل في حال الخطأ
      toast({
          variant: e.response.data.alert.type,
          title: e.response.data.alert.title,
          description: e.response.data.alert.message
      });
    }
  };
  
  if(isLoading) {
    return null;
  }
  return (
    <>
    <Carousel className="w-full max-w-xs">
      <CarouselContent >
        {data.data.plans.map((plan, index) => (
          <CarouselItem key={index}>
          <div className="flex flex-col border border-primary rounded-xl overflow-hidden bg-primary/5">
            <div className="text-center text-white pt-10 border-1 border-gray-400 rounded-b-2xl drop-shadow-2xl">
              <h5 className="text-xl font-medium">{plan.title}</h5>
              <h2 className="text-5xl mt-8 mb-3 items-center align-middle"> 
                <sup className="text-xl align-middle">DA</sup>{plan.price}
                <span className="text-lg font-medium">/{plan.duration} jours</span>
              </h2>
            </div>

            <div className="p-10">
              <ul className="mb-10 text-center text-white border-1 rounded border-gray-400 drop-shadow-2xl">
                <li className="flex items-center justify-center py-2">
                  
                    <h3 className="pl-2 pr-2 font-semibold">Pas besoin de sim Flexy pour travailler ! Profitez des recharges avec des frais réduits jusqu'à 0,95, soit 1000 DZD pour 950 DZD.</h3>
                  </li>
                <li className="flex items-center justify-center py-2">
                  <ion-icon name="shield-checkmark-outline"></ion-icon>
                    <h5 className="pl-2 pr-2 font-medium">Flixy Djezzy</h5>
                  </li>
                  <li className="flex items-center justify-center py-2">
                    <ion-icon name="shield-checkmark-outline"></ion-icon>
                    <h5 className="pl-2 pr-2 font-medium">Flixy Mobilis</h5>
                  </li>
                  <li className="flex items-center justify-center py-2">
                    <ion-icon name="shield-checkmark-outline"></ion-icon>
                    <h5 className="pl-2 pr-2 font-medium">Flixy Ooredoo</h5>
                  </li>
                  <li className="flex items-center justify-center py-2">
                    <ion-icon name="shield-checkmark-outline"></ion-icon>
                    <h5 className="pl-2 pr-2 font-medium">Recharge ADSL</h5>
                  </li>
                  <li className=" flex items-center justify-center py-2">
                    <ion-icon name="shield-checkmark-outline"></ion-icon>
                    <h5 className="pl-2 pr-2 font-medium">Recharge 4G</h5>
                  </li>
                </ul>
              <div className="flex justify-center">
                <Button disabled={isSubmitting} onClick={handlingButton} data-key={plan.id} className="py-3 px-6 font-medium  font-semibold border rounded-md border-primary hover:border-primary text-white bg-primary hover:bg-white hover:text-primary transition-all duration-500">
                  { !isSubmitting ? (
                    <>
                    Souscrivez sans attendre !
                    </>
                  ):(
                    <>
                    <Loader2 className="animate-spin" /> En traitement
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  </>
  );
}

export { Contant };