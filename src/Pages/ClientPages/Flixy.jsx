import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@nextui-org/input";
import { Check, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { useClientContext } from "../../Context/ClientContext.jsx";
import { Header } from "../../components/Client/FlixyP/Header.jsx";
import { Body } from "../../components/Client/FlixyP/Body.jsx";
import { FormTable } from "../../components/Client/FlixyP/Body/Tables.jsx";
import { Toaster } from "@/components/ui/toaster";
import { Skeleton } from "@/components/ui/skeleton";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox} from "@nextui-org/react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";



function Flixy() {
  const { toast } = useToast();
  const { t } = useTranslation();
  const { getOrders, checkOrder } = useClientContext();

  // حالات
  const [orderId, setOrderId] = useState(""); // لتخزين معرف الطلب
  const [status, setStatus] = useState(false); // لمعرفة حالة الإرسال
  const [isInnerModalOpen, setInnerModalOpen] = useState(false);
  const handleInnerModalClose = () => setInnerModalOpen(false);
  
  const [result, setResult] = useState({});
  
  const [alert, setAlert] = useState();
  // جلب الطلبات
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData(["user"]);
  const user = userData.data ;
  
  const { data: orders, isLoading: isLoadingOrders, refetch } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => await getOrders(),
    staleTime: 5 * 60 * 1000,
    cacheTime: 2 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnMount: false,
  });
  

  // دالة الإرسال
  const onSubmit = async () => {
    setStatus(true); // تعيين الحالة للإشارة إلى أن الإرسال قيد التنفيذ

    // بيانات الإرسال
    const data = { orderId };

       await checkOrder(data).then((res) => {
         setStatus(false);
        setResult(res.data.data.topup);
        
      })
      
      setInnerModalOpen(true);
  } 
  

  // عرض حالة التحميل
  if (isLoadingOrders) {
    return (
      <div className="flex flex-wrap justify-center gap-4">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      </div>
    );
  }

  return (
    <>
      {/* المكونات الرئيسية */}
      <Header />
      <Body />

      {/* أزرار التفاعل */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <Button
          onClick={() => refetch()} // إعادة جلب الطلبات
          className="font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          variant="outline"
        >
          {t("Rafraîchir")}
        </Button>

        {/* زر التحقق من الطلب */}
        <Sheet>
          <SheetTrigger
            style={{ borderRadius: "10px" }}
            className="flex items-center justify-center gap-2 text-black bg-[#FBBF24] hover:bg-[#FBBF24] font-medium rounded-lg text-sm px-5 py-2.5"
          >
            {t("Vérifier la commande")}
          </SheetTrigger>

          <SheetContent side="top" className="mt-16">
            <SheetHeader>
              <SheetTitle>{t("Vérifier la commande")}</SheetTitle>
              <SheetDescription>
                {/* حقل إدخال معرف الطلب */}
                <Input
                  label={t("Identifiant de commande")}
                  placeholder="order_878b****"
                  id="orderId"
                  variant="underlined"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="w-full text-xl py-4"
                />

                {/* زر التحقق */}
                <Button
                  disabled={status}
                  onClick={onSubmit}
                  className="w-full mt-4"
                >
                  {!status ? (
                    <>
                      <Check /> {t("Validation de l'opération")}
                    </>
                  ) : (
                    <>
                      <Loader2 className="animate-spin" /> {t("En traitement")}
                    </>
                  )}
                </Button>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      {isInnerModalOpen ? (
        <Modal 
          isOpen={isInnerModalOpen} 
          onOpenChange={handleInnerModalClose}
          placement="center"
          className="z-[2000]"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">{t('Détails de la commande')}</ModalHeader>
                <ModalBody>
                  {result.hasOwnProperty("error") ? (
                    <>
                    <div className="">
                      <p> {result.error} </p>
                    </div>
                    </>
                  ):(
                    <>
                    <div className="">
                      <div className="p-3 border-1 border-black rounded-3xl shadow drop-shadow-2xl">
                        <h3 className="text-[14px] font-bold p-1">{t('N° de téléphone: ')+result.MSSIDN}</h3>
                        <h3 className="text-[14px] font-bold p-1">{t('Montant: '+result.topup_amount+'DA')}</h3>
                        <h3 className="text-[14px] font-bold p-1">{t('Catégorie de recharge: ')+result.plan_code}</h3>
                        <h3 className="text-[14px] font-bold p-1">{t('Situation: ')+result.status}</h3>
                      </div>
                      <div className="text-[14px] font-bold p-1 text-center m-7">
                        {result.status === "PENDING" && (
                          <p>
                            {t(
                              "Votre commande est en attente de traitement. Elle sera prise en charge dans un délai de 2 à 15 secondes."
                            )}
                          </p>
                        )}
                        {result.status === "HANDLING" && (
                          <p>
                            {t(
                              "Votre commande est en cours de traitement. Vous recevrez le résultat dans un délai de 3 à 8 secondes."
                            )}
                          </p>
                        )}
                        {result.status === "FULFILLED" && (
                          <p>{t("Votre recharge mobile a été envoyée avec succès.")}</p>
                        )}
                        {result.status === "REFUNDED" && (
                          <p>{t("Votre recharge mobile a été remboursée avec succès.")}</p>
                        )}
                        {result.status === "UNKNOWN_ERROR" && (
                          <p>
                            {t(
                              "Une erreur inattendue est survenue. Nous procédons à une vérification manuelle et vous tiendrons informé dans les 1 à 12 heures. Le statut passera à 'Effectué' ou 'Remboursé' après confirmation. Merci de votre patience."
                            )}
                          </p>
                        )}
                        {!result.status && (
                          <p>{t("Statut inconnu. Veuillez réessayer plus tard.")}</p>
                        )}
                        
                      </div>
                    </div>
                    </>
                  )}
                </ModalBody>
                <ModalFooter>
                  
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal> 

      ):null}

      {/* جدول */}
      <FormTable />
      <Toaster />
    </>
  );
}

export { Flixy };