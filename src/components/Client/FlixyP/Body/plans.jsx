import { useQueryClient } from "@tanstack/react-query";
import { ClipboardCheck, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import React, { useState } from "react";
import { useClientContext } from "../../../../Context/ClientContext.jsx";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

function Plans() {
  const { sendFlixy, plans, lineInfo } = useClientContext();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  const {t} = useTranslation();
  
  const phone = window.localStorage.getItem("phone");
  const amount = window.localStorage.getItem("amount");
  const operator = window.localStorage.getItem("operator");

  // إدارة الحالة للقيمة المختارة
  const [selectedPlan, setSelectedPlan] = useState(t("Offres spécifiques"));
  const [Status, setStatus] = useState(false);
  
  let data = {};
  if(phone.startsWith("03") || phone.startsWith("04")) {
    data = {
      phone: phone,
      amount: amount,
      operator: operator,
      codePlanAdsl: selectedPlan,
      codePlan: 'null'
    };
  }else{
    data = {
      phone: phone,
      amount: amount,
      operator: operator,
      codePlan: selectedPlan
    };
  }
  

  // التعامل مع plans بشكل مختلف إذا كان الرقم يبدأ بـ 03 أو 04
  const plansArray = (phone.startsWith("03") || phone.startsWith("04")) ? [plans] : plans;  // إذا كان الرقم يبدأ بـ 03 أو 04، نعرض كائن واحد فقط
  let offer = plansArray[0];
  
  // عند الإرسال
  const handlingSubmite = async (values) => {
    setStatus(true);
    return await sendFlixy(data).then((res) => {
        toast({
          variant: res.data.alert.type,
          title: res.data.alert.title,
          description: res.data.alert.message
        });
        setStatus(false);
        return queryClient.invalidateQueries({ queryKey: ["orders"] }) && queryClient.invalidateQueries({ queryKey: ["user"] });
      }).catch((e) => {
        toast({
          variant: e.response.data.alert.type,
          title: e.response.data.alert.title,
          description: e.response.data.alert.message
        });
        setStatus(false);
        return queryClient.invalidateQueries({ queryKey: ["orders"] }) && queryClient.invalidateQueries({ queryKey: ["user"] });
      });
  };

  return (
    <>
      <Card className="">
        <CardHeader>
          <CardDescription>
            {t("Veuillez vérifier le numéro de téléphone et le montant avant de continuer.")}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className=" flex items-center space-x-4 rounded-md border p-4">
            <ClipboardCheck />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                {t('N° de téléphone')} : <p className="text-2xl"> {phone} </p>
              </p>
              <p className="text-sm font-medium leading-none">
                {t('Montant envoyé')} : <p className="text-2xl">{t('DA')} {amount} </p>
              </p>
              <p className="text-sm font-medium leading-none">
                {t('Catégorie de recharge')} : <p className="mt-2 text-[18px] font-mono"> {selectedPlan} </p>
              </p>
              { (phone.startsWith("03") || phone.startsWith("04")) ? (
                <>
                <p className="text-sm font-medium leading-none">
                  {t('Référence Client')} : <p className="mt-2 text-[18px] font-mono"> {lineInfo.ncli} </p>
                </p>
                <p className="text-sm font-medium leading-none">
                   {t('Débit de la Ligne')} : <p className="mt-2 text-[18px] font-mono"> {lineInfo.offre} </p>
                </p>
                <p className="text-sm font-medium leading-none">
                   {t('Type de Service')} : <p className="mt-2 text-[18px] font-mono"> {lineInfo.type} </p>
                </p>
                </>
                ):null
              }
            </div>
          </div>
          {/* Select المزدوج */}
          <div className="flex items-center space-x-4 rounded-md border p-4">
            <Select onValueChange={setSelectedPlan}>
              <SelectTrigger>
                <SelectValue placeholder={t("Forfait flexible")}></SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{t("Forfait flexible")}</SelectLabel>
                  {
                    // إذا كان الرقم يبدأ بـ 03 أو 04، نعرض كائن واحد فقط مباشرة
                    (phone.startsWith("03") || phone.startsWith("04")) ? (
                      <SelectItem key={offer.value} value={offer.value}>
                        {offer.value}
                      </SelectItem>
                    ) : (
                      // في الحالة الأخرى نعرض جميع الخطط
                      plans.map((plan) => (
                        <SelectItem key={plan.code} value={plan.code}>
                           {plan.name} 
                        </SelectItem>
                      ))
                    )
                  }
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button disabled={Status} onClick={handlingSubmite} type="submit" className="w-full">
            {!Status ? (
              <>
                <Check /> {t("Validation de l'opération")}
              </>
            ) : (
              <>
                <Loader2 className="animate-spin" /> {t('En traitement')}
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}

export { Plans };