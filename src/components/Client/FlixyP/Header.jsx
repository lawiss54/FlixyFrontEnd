import react from "react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {HeaderOfHeader} from "./Header/H-h.jsx";
import {BodyOfHeader} from "./Header/H-b.jsx";
import {useQueryClient} from "@tanstack/react-query";
import { useTranslation } from "react-i18next";


export const Header = () => {
  
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]);
  const {t} = useTranslation();
  //
  return(
    <>
    <div className="grid grid-cols-2 xs-sm:h-[200px] md:h-[300px] w-full bg-red-500 rounded-3xl">
    
    </div>
    
    
    
    
      
    </>
  );
};

const last = () => {
  
  return(
    <div className="order-1 row-start-1 col-span-12 pb-4 z-10 h-auto">
        <Card className=" drop-shadow-2xl rounded-b-[40%] border-2 border-white/50 hover:border-orangeWarningD-100 bg-gradient-to-tl from-blueFiroziD-100/90 via-blueFiroziD-400/90 to-blueFiroziD-600/70">
          <CardHeader >
            <CardTitle>
              <div className=" ">
                <h2 className="text-[14px] md:text-[28px] text-white text-center">
                  {t('Salut')} 
                  <p className="inline-grid font-bold text-buttonMain"> 
                    {' '+user.fname +' '+ user.lname} !
                  </p> 
                  {t('Merci de nous rejoindre, profitez de nos services.')} 
                </h2>
              </div>
              <hr className="border-gray-400"></hr>
            </CardTitle>
          </CardHeader>
          <CardContent >
            <BodyOfHeader />
          </CardContent>
        </Card>
      </div>
  )
}