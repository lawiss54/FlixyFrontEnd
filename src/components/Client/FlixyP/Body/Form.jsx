import { ReactComponent as OoredooSvg } from "../../../../assets/Ooredoo.svg";
import { ReactComponent as DjezzySvg } from "../../../../assets/Djezzy.svg";
import { ReactComponent as MobilisSvg } from "../../../../assets/Mobilis.svg";
import { ReactComponent as ADSL } from "../../../../assets/ADSL.svg";
import { ReactComponent as LTE } from "../../../../assets/4G.svg";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@nextui-org/input";
import { motion } from "motion/react";
import { Loader, CreditCard, Phone } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox,} from "@nextui-org/react";
import React, { useState } from "react";
import {Plans} from "./plans.jsx";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {SUBSCRIPTION_ROUTE} from "../../../../Router/index.jsx";
import { useToast } from "@/hooks/use-toast";
import {useClientContext} from "../../../../Context/ClientContext.jsx";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";


export const FormFlixy = () => {
  
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]);
  
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const { toast } = useToast();
  
  const { t } = useTranslation();
  
// استخدام react-hook-form مع zod للتحقق من المدخلات
const formSchema = z.object({
    phone: z.string().min(8, { message: t('Vérifiez et corrigez votre numéro de téléphone si nécessaire.') }),
    amount: z.string().min(2, { message: t('Le montant saisi est trop faible.') }),
  });

  const navigate = useNavigate();
  const {getPlans, setPlans, setLineInfo} = useClientContext();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { phone: "", amount: "" },
  });

  const { formState } = form;
  const { isSubmitting } = formState;

  const [iconOperator, setIconOperator] = useState(null);
  
  
  
  
  // دالة التحقق من المشغل بناءً على الرقم
  const checkOperator = (value) => {
    
      if (value.length >= 2) {
      
      const operator = value.substring(0, 2);
      if (operator === "07") {
        setIconOperator(<DjezzySvg className="pointer-events-none flex-shrink-0" width="50" height="25" />);
        window.localStorage.setItem('operator', 'Djezzy');
      } else if (operator === "05") {
        setIconOperator(<OoredooSvg className="pointer-events-none flex-shrink-0" width="50" height="25" />);
        window.localStorage.setItem('operator', 'Ooredoo');
      } else if (operator === "06") {
        setIconOperator(<MobilisSvg className="pointer-events-none flex-shrink-0" width="50" height="30" />);
        window.localStorage.setItem('operator', 'Mobilis');
      } else if (operator === "03") {
        setIconOperator(<ADSL className="pointer-events-none flex-shrink-0" width="50" height="30" />);
        window.localStorage.setItem('operator', 'ADSL');
      }  else if (operator === "04") {
        setIconOperator(<LTE className="pointer-events-none flex-shrink-0" width="50" height="30" />);
        window.localStorage.setItem('operator', '4G');
      } 
      
      else {
        setIconOperator(null);
      }
    } else {
      setIconOperator(null);
    }
    
    
  };

  const onSubmit = async (data) => {
    if(user.subscription_status === "subscribed"){
      window.localStorage.setItem('phone', data.phone);
      window.localStorage.setItem('amount', data.amount);
      let values = {
        'phone': data.phone,
        'amount': data.amount
      };
      return await getPlans(values).then((res) => {
         let plans = res.data.data;
         let lineInfo = res.data.info_line;
         setLineInfo(lineInfo);
         setPlans(plans);
        onOpen();
      }).catch((err) =>{
        let alert = err.response.data['alert'];
        
        toast({
           variant: alert.type ,
           title: alert.title ,
           description: alert.message ,
         });
      });
    }else{
         toast({
           variant: 'destructive' ,
           title: 'Aucun abonnement actif.' ,
           description: 'Aucun abonnement en cours. Activez un plan pour profiter de nos services.' ,
         });
         setTimeout(()=>{
           return navigate(SUBSCRIPTION_ROUTE);
         }, 3000);
        
    }
  };
  return(
    <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full h-auto">
              {/* حقل إدخال الهاتف */}
              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      label={t("Le numéro")}
                      placeholder="0794xxxxxx"
                      variant="underlined"
                      onChange={(e) => {
                        field.onChange(e); // تحديث القيمة في النموذج
                        checkOperator(e.target.value); // التحقق من المشغل
                      }}
                      startContent={
                        iconOperator || (
                          <span className="text-default-400 text-2xl pointer-events-none"><Phone /></span>
                        )
                      }
                      className="w-full text-xl py-4" // تكبير الحقل
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <div className="my-4"></div>
              {/* حقل إدخال المبلغ */}
              <FormField control={form.control} name="amount" render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      label={t("Le montant")}
                      placeholder="0.00"
                      variant="underlined"
                      startContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-default-400 text-lg">{t("DA")} </span>
                        </div>
                      }
                      className="w-full text-xl py-4" // تكبير الحقل
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <div className="flex justify-center mt-6">
                <motion.button
                  whileHover={!isSubmitting ? { scale: 1.1, backgroundColor: "#FCD34D" } : {}}
                  whileTap={!isSubmitting ? { scale: 0.95, rotate: 2 } : {}}
                  disabled={isSubmitting}
                  className={`flex items-center justify-center gap-2 text-black bg-[#FBBF24] hover:bg-[#FBBF24] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ${
                    isSubmitting ? "opacity-50 pointer-events-none" : ""
                  }`}
                >
                  {isSubmitting ? <Loader className="animate-spin" /> : <CreditCard />}
                  {t('Recharge')}
                </motion.button>
              </div>
            </form>
          </Form>
          <Modal 
            isOpen={isOpen} 
            onOpenChange={onOpenChange}
            isDismissable={false} 
            placement="center"
            className="z-[2000]"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">{t('Vérification')}</ModalHeader>
                  <ModalBody>
                    <Plans />
                  </ModalBody>
                  <ModalFooter>
                    
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
          
    </>
  )
};