import react from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {useClientContext} from "./../../../Context/ClientContext.jsx";
import { useToast } from "@/hooks/use-toast";
import { motion } from "motion/react";
import { Loader, Pencil } from "lucide-react";
import { useTranslation } from "react-i18next";



function ResetPassword(){
  const {t} = useTranslation();
  const {resetPassword, getToken} = useClientContext();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const formSchema = z.object({
  last_password: z.string()
    .min(6, { message: t("Veuillez entrer un mot de passe d'au moins 6 caractères.") }),
  password: z.string()
    .min(6, { message: t("Veuillez entrer un mot de passe d'au moins 6 caractères.") }),
  password_confirmation: z.string()
    .min(6, { message: t("Veuillez entrer un mot de passe d'au moins 6 caractères.") }),
});
  
   // Validation data form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      last_password: '' ,
      password: '' ,
      password_confirmation: '' ,
    },
  });
  
  const {setError, formState} = form;
  const { isSubmitting } = formState;
  
  const onSubmit = async (values) => {
    isSubmitting;
    return await resetPassword(values).then((res)=>{
      if("alert" in res.data){
         toast({
           variant: res.data.alert.type ,
           title: res.data.alert.title ,
           description: res.data.alert.message ,
         });
      }
    }).catch((err)=>{
      console.log(err);
       if("alert" in err.response.data){
         let errorsReponse = err.response.data;
         toast({
           variant: errorsReponse.alert.type ,
           title: errorsReponse.alert.title ,
           description: errorsReponse.alert.message ,
         });
       }else{
         
         for(let key in errorsReponse.errors){
           setError(key, {
             message: errorsReponse.errors[key],
          });
         }
       }
  });
  };
  
  return (
    <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="last_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">{t("Mot de passe actuel")}</FormLabel>
              <FormControl className="text-black">
                <Input placeholder={t("Entrez votre mot de passe actuel")} type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">{t("Nouveau mot de passe")}</FormLabel>
              <FormControl className="text-black">
                <Input placeholder={t("Entrez votre nouveau mot de passe.")} type="password" {...field} />
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
              <FormControl className="text-black">
                <Input placeholder={t("Répéter le nouveau mot de passe")} type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid place-items-center">
        
        <motion.button
          whileHover={!isSubmitting ? { scale: 1.1, backgroundColor: "#FCD34D" } : {}}
          whileTap={!isSubmitting ? { scale: 0.95, rotate: 2 } : {}}
          disabled={isSubmitting}
          className={`flex items-center justify-center gap-2 text-black bg-[#FBBF24] hover:bg-[#FBBF24] focus:ring-4 focus:ring-blue-300 font-medium rounded-2xl text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${
            isSubmitting ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          {!isSubmitting && <Pencil />}
          {isSubmitting && <Loader className="my-2 mx-2 animate-spin" />} 
          {t("Réinitialiser le mot de passe")}
        </motion.button>
        </div>
      </form>
    </Form>
    </>
  )
}

export {ResetPassword};