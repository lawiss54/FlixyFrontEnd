import react, {useState} from "react";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import {Avatar, AvatarGroup, AvatarIcon} from "@nextui-org/avatar";
import {useClientContext} from "./../../../Context/ClientContext.jsx";
import {ButtonActiveClient} from "./ButtonActiveClient.jsx";
// import {ButtonInactifClient} from "./ButtonInactiveClient.jsx";
import {ChangeInfo} from "./Form.jsx";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input} from "@nextui-org/react";
import {MailIcon} from './MailIcon.jsx';
import {LockIcon} from './LockIcon.jsx';
import {ResetPassword} from "./ResetPassword.jsx";
import { useQueryClient } from "@tanstack/react-query";
import {Otp} from "./Otp.jsx";
import { useTranslation } from "react-i18next";


export const Body = () => {
  
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  
  const {t} = useTranslation();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]);
  
  
  const [isInnerModalOpen, setInnerModalOpen] = useState();
  const [isFetch, setFetch] = useState(false);
  const handleInnerModalOpen = () =>{
    
        setInnerModalOpen(true);
  };
  const handleInnerModalClose = () => setInnerModalOpen(false);
  
  return (
    <motion.div 
      
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="col-span-12 row-span-6 m-4"
    >
      <Card 
        isBlurred
        className="grid grid-cols-12 grid-rows-6 rounded-3xl drop-shadow-lg bg-white"
        shadow="lg"
      >
        <CardHeader
          className="col-span-10 row-span-2 col-start-3"
        >
          <Avatar 
            className="w-20 h-20 drop-shadow-2xl" 
            isBordered 
            src="https://i.pravatar.cc/150?u=a04258a2462d826712d" 
          />
        <div>
          <h2 className="text-center font-bold pr-5 pl-5 drop-shadow-2xl"> {user.fname + ' ' + user.lname} </h2>
          <h2 className="text-center font-bold mt-2 drop-shadow-2xl"> <ButtonActiveClient /></h2>
        </div>
        </CardHeader>
        
        <CardBody className="col-span-12 row-span-6">
          <div className="w-auto m-2">
            <ChangeInfo />
          </div>
          
        </CardBody>
        <CardFooter className="col-span-10 col-start-3  drop-shadow-2xl">
            <Button
              className="gap-2 text-white bg-redDenger hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              onPress={onOpen}
            >
              
                {t('Modifier le mot de passe')}
              
            </Button>
          </CardFooter>
        </Card>
        
        <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="center"
        className="z-[2000]"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{t('Modifier le mot de passe')}</ModalHeader>
              <ModalBody>
              <ResetPassword />
              </ModalBody>
              <ModalFooter>
                <Button isDisabled={isFetch} isLoading={isFetch} color="danger" variant="flat" onPress={handleInnerModalOpen}>
                  {t('Mot de passe actuel oublié')}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
       {isInnerModalOpen && (
        <Modal
          isOpen={isInnerModalOpen}
          onOpenChange={handleInnerModalClose}
          placement="center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>{t('Mot de passe actuel oublié')}</ModalHeader>
                <ModalBody>
                  <Otp />
                </ModalBody>
                
              </>
            )}
          </ModalContent>
        </Modal>
      )}
      
     </motion.div>
  );
  
}