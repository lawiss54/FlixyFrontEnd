import react, {useState, useEffect} from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import {  Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import { useClientContext } from "../../Context/ClientContext.jsx";
import * as motion from "motion/react-client";

function TableFee() {
  
  const {t} = useTranslation();
  const {getfee} = useClientContext();
  
  const { data: tablesFee, isLoading, refetch, error } = useQuery({
    queryKey: ["tablesFee"],
    queryFn: async () => {
      return await getfee().then((res) => {
        return res.data.data;
    }).catch((e) => {
        throw new Error("Failed to fetch transactions");
    })},
    staleTime: 5 * 60 * 1000,
    cacheTime: 2 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
  console.log(tablesFee)
  if(isLoading){
    return (
    <> 
      <div className="min-h-screen flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.5, easing: "ease-in-out"}}
            className="relative w-12 h-12">
            <motion.div 
              initial={{scaleX: 1, originX: 0.5}}
              animate={{ scaleX: [1, 3, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatType: "loop"  }}
              className="absolute top-16 left-0 w-12 h-1.5 bg-[#65C7EB] rounded-full">
            </motion.div>
            <motion.div
              initial={{y: 0}}
              animate={{ rotate: 360, y:[0 , -50, 0] }}
              transition={{ duration: 1, repeat: Infinity, repeatType: "loop"  }}
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-tl from-blueFiroziD-100/90 via-blueFiroziD-400/90 to-blueFiroziD-600/70 rounded-md"></motion.div>
          </motion.div>
        </div>
    </>
    )
  }
  if(error){
    return (<>{error.message}</>)
  }
  
  return(
    <>
      <Table className="w-full md:h-[33vh]">
        <TableCaption>{t('Liste des frais de commission.')}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">{t('Réseau mobile')}</TableHead>
              <TableHead>{t("Nom de l'offre")}</TableHead>
              <TableHead>{t("Frais")}</TableHead>
              <TableHead className="text-center"> {t("Pour 1000 DZD")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {tablesFee.map((row) => (
            <TableRow key={row.code}>
              <TableCell className="font-medium">{row.operator}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.cost} </TableCell>
              <TableCell>
                  {1000*row.cost}{t('DA')}
              </TableCell>
            </TableRow>
          ))}
          </TableBody>
        </Table>
      </>
  );
};
export {TableFee};