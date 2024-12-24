
import React, {useState} from "react";
import { motion } from "motion/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useClientContext } from "./../../../Context/ClientContext.jsx";
import { Loader, Pencil } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import {Button} from "@nextui-org/react";
import { Send, RotateCcw } from 'lucide-react';
import { useTranslation } from "react-i18next";



function Otp() {
  const [value, setValue] = React.useState("");
  const { resetPasswordByOtp, getOtp} = useClientContext();
  const { toast } = useToast();
  const {t} = useTranslation();
  
  const formSchema = z.object({
  otp: z.string()
    .min(6, { message: t("Veuillez entrer Code OTP") }),
  password: z.string()
    .min(6, { message: t("Veuillez entrer un mot de passe d'au moins 6 caractères.") }),
  password_confirmation: z.string()
    .min(6, { message: t("Veuillez entrer un mot de passe d'au moins 6 caractères.") }),
});
  
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
      password: "",
      password_confirmation: "",
    },
  });
  const {setError, formState} = form;
  const { isSubmitting } = formState;

  
  
  const onSubmit = async (values) => {
    return await resetPasswordByOtp(values)
      .then((res) => {
        isSubmitting;
        if("alert" in res.data){
         toast({
           variant: res.data.alert.type ,
           title: res.data.alert.title ,
           description: res.data.alert.message ,
         });
        }
      })
      .catch((err) => {
        isSubmitting;
        if("alert" in err.data){
         toast({
           variant: err.data.alert.type ,
           title: err.data.alert.title ,
           description: err.data.alert.message ,
         });
        }else{
          let errorsReponse = err.response.data.errors;
          for(let key in errorsReponse){
           setError(key, {
             message: errorsReponse[key],
          });
         }
        }
      });
  };
  
  const[isFetch, setIsFetch] = useState();
  const[isSend, setIsSend] = useState();
  const[Reponse, setReponse] = useState("");
  const sendOtp = async () => {
    setIsFetch(true);
    setIsSend(true);
    return await getOtp().then((res) => {
      setReponse(res.data.message);
      setIsFetch(false);
    }).catch((err) => {
      setReponse(error.response.data.message);
      setIsFetch(false);
    });
    
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" flex flex-col justify-center items-center space-y-8">
        {/* خانات OTP */}
        {!Reponse ? (
          <>
            <p className="text-center"> {t("Appuyez sur Envoyer pour que le code secret soit envoyé à votre boîte email.")} <br></br> <br></br> <p className="text-center font-bold">{t("Entrez votre code secret si vous l’avez déjà.")}</p></p>
          </>
        ):(
          <>
            <p className="text-center"> {Reponse} </p>
          </>
        )}
        
        <InputOTP
          className="flex items-center justify-center content-between"
          maxLength={6}
          name="otp"
          value={value}
          onChange={(val) => {
            setValue(val);
            form.setValue("otp", val);
          }}
        >
        
          <InputOTPGroup>
            <InputOTPSlot index={0} className=" drop-shadow drop-shadow-l" />
            <InputOTPSlot index={1} className="drop-shadow drop-shadow-l"/>
            <InputOTPSlot index={2} className="drop-shadow drop-shadow-l "/>
            <InputOTPSlot index={3} className="drop-shadow drop-shadow-l"/>
            <InputOTPSlot index={4} className="drop-shadow drop-shadow-l"/>
            <InputOTPSlot index={5} className="drop-shadow drop-shadow-l"/>
          </InputOTPGroup>
        </InputOTP>
        <Button className="m-3" isIconOnly color="warning" variant="faded" aria-label={t("envoi OTP")} isDisabled={isFetch} isLoading={isFetch} onPress={sendOtp}>
             {!isSend ? (
               <>
                <Send />
               </>
              ):(
                <RotateCcw />
              )}
        </Button>

        {/* الحقول الأخرى */}
        <div className="space-y-4 w-80">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">{t("Nouveau mot de passe")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("Entrez votre nouveau mot de passe.")}
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password_confirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">{t("Répétez le mot de passe")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("Répéter le nouveau mot de passe")}
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* زر الإرسال */}
        <motion.button
          whileHover={!isSubmitting ? { scale: 1.1, backgroundColor: "#FCD34D" } : {}}
          whileTap={!isSubmitting ? { scale: 0.95, rotate: 2 } : {}}
          disabled={isSubmitting}
          className={`flex items-center justify-center gap-2 text-black bg-[#FBBF24] hover:bg-[#FBBF24] font-medium rounded-2xl px-5 py-2.5 ${
            isSubmitting ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          {!isSubmitting && <Pencil />}
          {isSubmitting && <Loader className="animate-spin" />}
          {t("Réinitialiser le mot de passe")}
        </motion.button>
      </form>
    </Form>
  );
}

export { Otp };