import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {FLIXY_ROUTE} from "./../../Router/index.jsx";
import { useNavigate } from "react-router-dom";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader, LogIn } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {useClientContext} from "../../Context/ClientContext.jsx";
import react, {useState} from "react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import Cookies from 'js-cookie';




 function UserLogin(){
   
   const {login, setAuthentication, logout} = useClientContext();
   
  // تعريف دالة useNavigation في متغير لاستعماله لاحقا
  // تفيدنا هذه دالة لارسال زئر لصفحة اخرى بدون اعادة تحميل
  const navigate = useNavigate();
  const {t} = useTranslation();
  
  // تعريف شكل البيانات باستخدام Zod
const formSchema = z.object({
  email: z.string()
    .min(1, { message: t("Le champ email est obligatoire.") })
    .email({message: t("Veuillez entrer une adresse email valide dans le champ 'Email'.")}),
  password: z.string()
    .min(6, { message: t("Veuillez entrer un mot de passe d'au moins 6 caractères") }),
});
  
  // Validation data form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  const {setError, formState} = form;
  const { isSubmitting } = formState;
 
  
  // دالة onSubmit لعرض البيانات
  const onSubmit = async (values) => {
    return await login(values).then(
      (res) => {
        isSubmitting ;
         console.log(res.data.access_token)
           Cookies.set('authToken', res.data.access_token);
           setAuthentication(true);
           //check status code if = 200 redirect user to flixy page
          return navigate(FLIXY_ROUTE);
         
      }).catch(
      (error) => {
        
        // save message error in var
        setAuthentication(false);
        logout();
        let errorsReponse = error.response.data.message;
        // set error to render if happen
          setError('password', {
            message: errorsReponse ,
          });
          
      }
    );
    
  };

  return (
    
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">{t("Email")}</FormLabel>
              <FormControl className="text-black">
                <Input style={{borderRadius:'10px' }} placeholder="email@gmail.com" {...field} />
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
                <AlertDescription>
                  <FormMessage />
                </AlertDescription>
            </FormItem>
          )}
        />
        <div className="grid place-items-center">
                
        <motion.button
          whileHover={!isSubmitting ? { scale: 1.1, backgroundColor: "#FCD34D" } : {}}
          whileTap={!isSubmitting ? { scale: 0.95, rotate: 2 } : {}}
          disabled={isSubmitting}
          style={{borderRadius:'10px' }}
          className={`flex items-center justify-center gap-2 text-black bg-[#FBBF24] hover:bg-[#FBBF24] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${
            isSubmitting ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          {!isSubmitting && <LogIn />}
          {isSubmitting && <Loader className="my-2 mx-2 animate-spin" />} 
          {t("Connexion")}
        </motion.button>
        </div>
      </form>
    </Form>

  );
}

export {UserLogin};