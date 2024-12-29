import {Chip} from "@nextui-org/react";
import { useTranslation } from "react-i18next";

export const ButtonInactifClient = () => {
  const { t } = useTranslation();
  return(
    <Chip
      variant="shadow"
      classNames={{
        base: "bg-gradient-to-br from-orangeWarningD-500 to-redDengerD-500 border-small border-white/50 shadow-redDengerD-500/30",
        content: "drop-shadow shadow-black text-white",
      }}
    >
      {t('Abonnement Inactif')}

    </Chip>
  )
}