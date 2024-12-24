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
    <div className="col-start-2 m-2 col-span-10 row-span-4 md:row-span-1 md:col-start-2 lg:col-start-3 md:col-span-8 lg:col-span-6 xl:col-span-4 p-6 flex justify-center items-center place-content-center rounded-3xl backdrop-blur-lg drop-shadow-2xl h-full w-full">
      <Carousel
        plugins={[plugin.current]}
        className="w-full h-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {Object.keys(plans || {}).map((key) => {
            const plan = plans[key];
            return (
              <CarouselItem key={key}>
                <Card className="flex flex-col items-center h-auto justify-around w-auto p-[20px_1px] m-[10px_0] text-center relative cursor-pointer p-2 rounded-3xl drop-shadow-md bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500">
                  <CardContent className="content p-[20px]">
                    <div className="price mb-5 md:ml-4 md:mr-4 md:p-2 text-white font-extrabold text-[30px] md:text-[40px] shadow-[0px_0px_10px_rgba(0,0,10,0.42)]">
                      {plan.price} {t('DA')}
                    </div>
                    <br />
                    <div className="description mb-5 text-white/80 mt-2 text-[15px] md:text-[24px]">
                      {plan.description}
                    </div>
                    <br />
                    <div className="title mb-5 text-center font-extrabold uppercase text-white mt-2 text-[25px] md:text-[40px] tracking-widest">
                      {plan.title}
                    </div>
                    <br />
                    <Button
                      disabled={isLoading} // تعطيل الزر أثناء التحميل
                      onClick={() => handlingButton(plan.id)}
                      className={`select-none md:m-10 border-none outline-none text-white uppercase font-bold text-[0.75rem] p-[0.75rem_1.5rem] md:text-[30px] rounded-lg w-[90%] shadow-[0px_4px_18px_#2c3442] ${
                        isLoading
                          ? "bg-gray-400 cursor-not-allowed" // حالة التحميل
                          : "bg-[#2196F3]"
                      }`}
                    >
                      {!isLoading ? (
                        <>{t("Abonnez-vous maintenant")}</> // النص العادي
                      ) : (
                        <Loader className="animate-spin" /> // دائرة التحميل
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export { Contant };