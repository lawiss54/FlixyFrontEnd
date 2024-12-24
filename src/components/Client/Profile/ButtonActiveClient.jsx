import {Chip} from "@nextui-org/react";
import { useTranslation } from "react-i18next";

export const ButtonActiveClient = () => {
  const { t } = useTranslation();
  
  return(
    <Chip
      variant="shadow"
      classNames={{
        base: "bg-gradient-to-br from-blueFiroziD-500 to-greenSuccessD-500 border-small border-white/50 shadow-greenSuccessD-500/30",
        content: "drop-shadow shadow-black text-white",
      }}
    >
      {t('Abonnement actif')}
    </Chip>
  )
}