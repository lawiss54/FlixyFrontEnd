import * as React from "react";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import {useClientContext} from "./../../../Context/ClientContext.jsx";
import { motion } from "motion/react";

export const Header = () => {
  const {user} = useClientContext();
  
  
  return(
    <motion.div
      className="box"
      initial={{ opacity: 0, scale: 0.5, zIndex: 20}}
      animate={{ opacity: 1, scale: 1, zIndex: 20}}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01]
      }}
    >
        <Card 
          radius="lg"
          isBlurred
          className="relative absolute translate-y-8 top-[15%] right-[20%] left-[20%] border-none dark:bg-default-100/50 bg-gradient-to-bl from-blueFiroziD-200 to-transparent hover:from-blueFiroziD-500 hover:to-blueInfoD-200 bg-gray-0 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100  bg-white shadow-lg rounded-lg"
          shadow="sm"
        >
          <CardBody className="text-center">
            <p>
              Bonjour, {user.fname + ' ' + user.lname}! Voici les détails de votre profil. Assurez-vous qu'ils sont corrects.
            </p>
          </CardBody>
        </Card>
    </motion.div>
  );
  
};

