//import Form from '../ui/form';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {FLIXY_ROUTE} from "./../../Router/index.jsx";
import { useNavigate } from "react-router-dom";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader, UserPlus } from "lucide-react";
import {useClientContext} from "../../Context/ClientContext.jsx";
import react, {useState} from "react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import Cookies from 'js-cookie';

// تعريف شكل البيانات باستخدام Zod


 function UserRegister(){
   
   const {register, setAuthentication, logout} = useClientContext();
  // تعريف دالة useNavigation في متغير لاستعماله لاحقا
  // تفيدنا هذه دالة لارسال زئر لصفحة اخرى بدون اعادة تحميل
  const navigate = useNavigate();
  const {t} = useTranslation();

  const formSchema = z.object({
  fname: z.string()
    .min(3, { message: t("Veuillez remplir le champ 'Nom' avec au moins 3 caractères.") }),
  lname: z.string()
    .min(3, { message: t("Veuillez remplir le champ 'Prénom' avec au moins 3 caractères.") }),
  email: z.string()
    .email(t("Veuillez entrer une adresse email valide dans le champ 'Email'.")),
  phone: z.coerce.number()
    .min(9, { message: t("Le champ 'Numéro de téléphone' est obligatoire et doit être valide.") }),
  ref_code: z.string()
    .optional()
    .nullable(),
  password: z.string()
    .min(6, { message: t("Veuillez entrer un mot de passe d'au moins 6 caractères.") }),
  password_confirmation: z.string()
    .min(6, { message: t("Veuillez entrer un mot de passe d'au moins 6 caractères.") }),
}).superRefine(({ password_confirmation, password }, ctx) => {
  if (password_confirmation !== password) {
    ctx.addIssue({
      code: "custom",
      message: t("le mot de passe et la confirmation sont différents."),
      path: ['password_confirmation']
    });
  }
});
  
  // Validation data form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fname: "",
      lname: "",
      email: "",
      phone: "",
      password: "",
      password_confirmation: "",
      ref_code: ""
    },
  });
  const {setError, formState} = form;
  const { isSubmitting } = formState;

  

  const onSubmit = async (values) => {
     // تحديث حالة الإرسال
    return await register(values).then((res) => {
      isSubmitting;
      Cookies.set("authToken", res.data.access_token, { expires: 1 });
      setAuthentication(true);
      return navigate(FLIXY_ROUTE);
    }).catch((error) => {
      isSubmitting;
      if (error.response && error.response.data) {
      const errorsResponse = error.response.data;

      if ("errors" in errorsResponse) {
        for (let key in errorsResponse.errors) {
          setError(key, {
            message: errorsResponse.errors[key],
          });
        }
      } else {
        setError("ref_code", {
          message: errorsResponse.message,
        });
      }
    }
    });
  }
  return (
    
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" grid grid-cols-2 gap-2 ">
        <FormField
          control={form.control}
          name="fname"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel className="text-white"> {t("Nom")} </FormLabel>
              <FormControl className="text-black">
                <Input style={{borderRadius:'10px' }} placeholder={t("Met ton Nom.")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lname"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">{t("Prénom")}</FormLabel>
              <FormControl className="text-black">
                <Input style={{borderRadius:'10px' }} placeholder={t("Met ton Prénom.")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel className="block text-white">{t("Email")}</FormLabel>
              <FormControl className="w-full text-black">
                <Input style={{borderRadius:'10px' }} placeholder="oua****erif@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel className="block text-white">{t("Numéro de Téléphone")}</FormLabel>
              <FormControl className="w-full text-black">
                <Input style={{borderRadius:'10px' }} placeholder="079****080" {...field} />
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
              <FormLabel className="text-white">{t("Mot de passe")}</FormLabel>
              <FormControl className="text-black">
                <Input style={{borderRadius:'10px' }} placeholder="******" type="password" {...field} />
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
              <FormLabel className="text-white">{t("Réécr...")}</FormLabel>
              <FormControl className="text-black">
                <Input style={{borderRadius:'10px' }} placeholder="******" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ref_code"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel className="block text-white">{t("Code de référence")}</FormLabel>
              <FormControl className="w-full text-black">
                <Input style={{borderRadius:'10px' }} placeholder="ref_xxxxx" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="col-span-2 mx-auto place-items-center">
        <motion.button
          whileHover={!isSubmitting ? { scale: 1.1, backgroundColor: "#FCD34D" } : {}}
          whileTap={!isSubmitting ? { scale: 0.95, rotate: 2 } : {}}
          disabled={isSubmitting}
          type="submit"
          style={{borderRadius:'10px' }}
          className={`flex items-center justify-center gap-2 text-black bg-[#FBBF24] hover:bg-[#FBBF24] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${
            isSubmitting ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          {!isSubmitting && <UserPlus />}
          {isSubmitting && <Loader className="my-2 mx-2 animate-spin" />} 
          {''} {t("Créer mon compte")}
        </motion.button>
        
        
        </div>
      </form>
    </Form>

  );
}

export {UserRegister};
