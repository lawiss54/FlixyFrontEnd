import react from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {Textarea} from "@nextui-org/input";
import { useNavigate } from "react-router-dom";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader, Send } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";



export const ContactUs = () => {
  const {t} = useTranslation();
  
  const formSchema = z.object({
  name: z.string()
    .min(3, { message: t("Le champ Votre Nom est obligatoire.") }),
  sujet: z.string()
    .min(6, { message: t("Indiquez le Sujet Principal") }),
  message: z.string()
    .min(15, { message: t("Précisez Votre Idée") }),
});
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      sujet: "",
      message: "",
    },
  });
  const {setError, formState} = form;
  const { isSubmitting } = formState;
  
  const onSubmit = async (values) => {
    
  };
  
  return (
    <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">{t("Nom")}</FormLabel>
              <FormControl className="text-black">
                <Input style={{borderRadius:'10px' }} className="text-[11px]" placeholder={t("Votre Nom")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sujet"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">{t("Sujet")}</FormLabel>
              <FormControl className="text-black">
                <Input style={{borderRadius:'10px' }} className="text-[11px]" placeholder={t("Veuillez spécifier le sujet de votre demande.")}  {...field} />
              </FormControl>
                <AlertDescription>
                  <FormMessage />
                </AlertDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">{t("Message")}</FormLabel>
              <FormControl className="text-black">
                <Textarea style={{borderRadius:'10px' }} className="text-[11px]" placeholder={t("Contenu du Message")}  />
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
          {!isSubmitting && <Send />}
          {isSubmitting && <Loader className="my-2 mx-2 animate-spin" />} 
          {t("Envoyer")}
        </motion.button>
        </div>
      </form>
    </Form>
  </>
  );
};