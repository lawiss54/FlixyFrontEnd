import react, {useState, useEffect} from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader, Pencil } from "lucide-react";
import { motion } from "motion/react";
import {useClientContext} from "./../../../Context/ClientContext.jsx";
import {useQueryClient} from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

function ChangeInfo(){
  
  const {t, i18n} = useTranslation();  // تعديل هنا لجلب i18n
  const {updateUser, setUser} = useClientContext();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]);
  

  const formSchema = z.object({
    lname: z.string()
      .min(3, { message: t("Veuillez remplir le champ 'Nom' avec au moins 3 caractères.") }),
    fname: z.string()
      .min(3, { message: t("Veuillez remplir le champ 'Prénom' avec au moins 3 caractères.") }),
    phone: z.coerce.number()
      .min(9, { message: t("Le champ 'Numéro de téléphone' est obligatoire et doit être valide.") }),
    email: z.string()
      .min(1, { message: t("Le champ email est obligatoire.") })
      .email({message: t("Veuillez entrer une adresse email valide dans le champ 'Email'.")}),
  });

  // Validation data form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lname: '' ,
      fname: '' ,
      phone: '' ,
      email: '' ,
    },
  });

  const {setError, formState} = form;
  const { isSubmitting } = formState;

  const onSubmit = async (values) => {
    return await updateUser(values).then((res)=>{
      isSubmitting;
      if("alert" in res.data){
        toast({
          variant: res.data.alert.type ,
          title: res.data.alert.title ,
          description: res.data.alert.message ,
        });
      }else{
        return res.data.status;
      }
      queryClient.fetchQuery(["user"]);
    }).catch((err) => {
       let errorsReponse = err.response.data.errors;
         if("alert" in err.response.data){
           toast({
           variant: err.response.data.type ,
           title: err.response.data.title ,
           description: err.response.data.message ,
         });
       }else{
         for(let key in errorsReponse){
           setError(key, {
             message: errorsReponse[key],
          });
         }
       }
    });
  };

  return (
    <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="col-span-12 row-span-6 bg-white p-4 rounded-lg shadow-md">
        <FormField
          control={form.control}
          name="lname"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black col-span-12" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
                {t('Nom')}
              </FormLabel>
              <FormControl className="text-black">
                <Input placeholder={user.lname} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <br></br>
        <FormField
          control={form.control}
          name="fname"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
                {t('Prenom')}
              </FormLabel>
              <FormControl className="text-black">
                <Input placeholder={user.fname} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <br></br>
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel className="block text-black" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
                {t('N° de téléphone')}
              </FormLabel>
              <FormControl className="w-full text-black">
                <Input placeholder={'0'+user.phone} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <br></br>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
                {t('Email')}
              </FormLabel>
              <FormControl className="text-black">
                <Input placeholder={user.email} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <br></br>
        <div className="grid place-items-center mt-6">
          <motion.button
            whileHover={!isSubmitting ? { scale: 1.1, backgroundColor: "#FCD34D" } : {}}
            whileTap={!isSubmitting ? { scale: 0.95, rotate: 2 } : {}}
            disabled={isSubmitting}
            type="submit"
            className={`flex items-center justify-center gap-2 text-black bg-[#FBBF24] hover:bg-[#FBBF24] focus:ring-4 focus:ring-blue-300 font-medium rounded-2xl text-sm px-5 py-2.5 me-2 mb-2 ${
              isSubmitting ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            {!isSubmitting && <Pencil />}
            {isSubmitting && <Loader className="my-2 mx-2 animate-spin" />} 
            {t("Modifier le profile")}
          </motion.button>
        </div>
      </form>
    </Form>
  </>
  );
}

export {ChangeInfo}