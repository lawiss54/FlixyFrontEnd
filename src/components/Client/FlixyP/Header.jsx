import react from "react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {HeaderOfHeader} from "./Header/H-h.jsx";
import {BodyOfHeader} from "./Header/H-b.jsx";

export const Header = () => {
  
  
  //
  return(
    <>
      <div className="order-1 row-start-1 col-span-12 pb-4 z-10 h-auto">
        <Card className=" drop-shadow-2xl rounded-b-[40%] border-2 border-white/50 hover:border-orangeWarningD-100 bg-gradient-to-tl from-blueFiroziD-100/90 via-blueFiroziD-400/90 to-blueFiroziD-600/70">
          <CardHeader >
            <CardTitle>
              <HeaderOfHeader />
            </CardTitle>
          </CardHeader>
          <CardContent >
            <BodyOfHeader />
          </CardContent>
        </Card>
      </div>
    </>
  );
};