import react,{useState} from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Loader2, Wallet, ArrowUpFromLine, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {FormWallet} from "./Form.jsx";
import {useQueryClient} from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";

export const Body = () => {
  
  const[isOpen, setIsOpen] = useState(false);
  
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]);
  
  
  const {t} = useTranslation();
  
  const handlingOpenForm = () => {
    if(!isOpen){
      return setIsOpen(true);
    }
  };
  
  return(
    <>
    <Card className="bg-white bg-opacity-30 backdrop-blur-lg p-6 rounded-lg border border-white border-opacity-40 drop-shadow-lg w-full grid grid-cols-12">
        <CardHeader className="col-span-12">
          <CardDescription>
            <div className=" flex items-center space-x-4 rounded-md border p-4 border-blue-300">
              <h2 className="font-extrabold text-xl text-white text-center">
                {t("Gestion de portefeuille. Créditer de l'argent")}
              </h2>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className=" col-span-12 ">
          <div className=" flex items-center  rounded-md border border-white border-opacity-40 drop-shadow-lg p-4 mb-3">
            <Wallet className="text-white" />
            <div className="flex-1">
              <h3 className="text-sm text-white font-medium leading-none pl-3 mb-1">
                {t("Identité du client : ")}<p className="text-2xl xs:text-[16px] sm:text-[18px] md:[24px] text-white "> {user.lname+' '+user.fname} </p>
              </h3>
              <h3 className="text-sm text-white font-medium leading-none pl-3">
                {t("Le solde du portefeuille")} : <p className="text-2xl xs:text-[16px] sm:text-[18px] md:[24px] text-white text-white">{user.balance} {t("DA")}</p>
              </h3>
            </div>
          </div>
          {!isOpen ? (
            <>
            
            </>
          ):(
            <>
            <motion.div 
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className=" flex items-center space-x-4 rounded-md border border-white border-opacity-40 drop-shadow-lg  mb-3 xs:w-auto">
                <div className="flex flex-col">
                  <h3 className="text-sm text-white p-4 text-[16px] xs:text-[12px] font-bold font-medium text-center xs:w-auto leading-relaxed">
                    {t("Transférez la somme demandée sur ce compte par Baridi Mob ou compte bancaire courant.")}
                  </h3>
                  <h3 className="text-lg xs:text-[15px] xs:p-2 text-white font-bold font-medium leading-relaxed">
                    RIP Baridi Mob : 00799999002476295067
                  </h3>
                  <h3 className="text-lg xs:text-[15px] xs:p-2 text-white font-bold font-medium leading-relaxed">
                    CCP : 24762950 Clé 66
                  </h3>
                  <h3 className="text-lg xs:text-[15px] xs:p-2 text-white font-bold font-medium leading-relaxed">
                    Le titulaire : M.OUADDAH CHERIF
                  </h3>
                  <h3 className="text-lg xs:text-[15px] xs:p-2 text-white font-bold font-medium leading-relaxed">
                    Frais de transfert : 30 DA
                  </h3>
                  <div className=" flex text-center text-[18px] font-bold items-center space-x-4 rounded-md border border-blue-300 border-opacity-40 drop-shadow-lg p-4">
                    {t("Après l’envoi, n’oubliez pas de transmettre le montant, le RIP ou le CCP utilisé, ainsi que la preuve de paiement, afin de traiter votre transaction rapidement.")}
                  </div>
                </div>
              </div>
              <div className=" flex items-center md:place-content-center space-x-4 rounded-md border p-4 border border-white border-opacity-40 drop-shadow-lg mb-3">
                <FormWallet />
              </div>
            </motion.div>
            </>
          )}
        </CardContent>
        <CardFooter className="col-span-12">
          {!isOpen ? (
            <>
            <Button type='submit' onClick={handlingOpenForm} className="w-full">
              <ArrowUpFromLine /> {t("Créditer le portefeuille")}
              </Button>
            </>
          ):null
          }
        </CardFooter>
    </Card>
    </>
  );
};