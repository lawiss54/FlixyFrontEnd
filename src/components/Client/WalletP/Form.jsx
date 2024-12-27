import react from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, Check } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {useClientContext} from "../../../Context/ClientContext.jsx";
import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/use-toast";



// تعريف شكل البيانات باستخدام Zod



export const FormWallet = () => {
  
  const {t} = useTranslation();
  const { toast } = useToast();
  
  const formSchema = z.object({
  balance: z.coerce.number()
    .min(4, { message: t("Vous devez saisir au moins 1000 DA.") }),
  rip_sender: z.string()
    .min(3, { message: t("Indiquez le RIP utilisé pour l'envoi.") })
    .optional()
    .nullable(),
  prof: z.instanceof(File)
  .refine(
    (file) =>
      ["image/jpeg", "image/png", "image/jpg"].includes(file.type),
    { message: t("Seules les images au format JPEG/PNG sont autorisés acceptés.") }
  )
  .nullable(),
});
  
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      balance: "",
      rip_sender: "",
      prof: null,
    },
  });
  
  const {fondWallet} = useClientContext();
  const {register, setError, formState} = form;
  const { isSubmitting } = formState;
  
  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("balance", values.balance);
    formData.append("rip_sender", values.rip_sender || ""); // إذا كان الحقل اختياري
    if (values.prof) {
        formData.append("prof", values.prof);
    }

    return await fondWallet(formData).then((res) => {
        toast({
          variant: res.data.alert.type,
          title: res.data.alert.title,
          description: res.data.alert.message
        });
          
      }).catch((e) => {
        toast({
          variant: e.response.data.alert.type,
          title: e.response.data.alert.title,
          description: e.response.data.alert.message
        });
          
      });
  };
  
  
  return (
    
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 grid grid-cols-2 gap-2 ">
        <FormField
          control={form.control}
          name="balance"
          render={({ field }) => (
            <FormItem className="translate-y-8">
              <FormLabel className="text-white"> {t("Amount")} </FormLabel>
              <FormControl className="text-black">
                <Input style={{borderRadius:'10px' }} placeholder={t("Montant de la Transaction")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rip_sender"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">{t("RIP/CCP")}</FormLabel>
              <FormControl className="text-black">
                <Input style={{borderRadius:'10px' }} placeholder="00799xxxx" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="prof"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel className="block text-white">{t("Envoyer le reçu")}</FormLabel>
              <FormControl className="w-full">
               <Input
                type="file"
                id="prof"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null; // إذا لم يتم تحديد ملف، اجعل القيمة null
                  field.onChange(file);
                }}
                
                accept="image/jpeg,image/png"
              />

              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' disabled={isSubmitting} className="col-span-2 w-full">
            {!isSubmitting ? (
              <>
                <Check /> 
                {t("Soumettre l'opération")}
              </>
            ):(
              <>
                <Loader2 className="animate-spin" /> 
                {t("Veuillez patienter")}
              </>
            )}
        </Button>
      </form>
    </Form>

  );
  
};