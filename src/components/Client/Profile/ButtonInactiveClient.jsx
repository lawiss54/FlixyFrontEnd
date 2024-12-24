import {Chip} from "@nextui-org/react";

export const ButtonInactifClient = () => {
  return(
    <Chip
      variant="shadow"
      classNames={{
        base: "bg-gradient-to-br from-orangeWarningD-500 to-redDengerD-500 border-small border-white/50 shadow-redDengerD-500/30",
        content: "drop-shadow shadow-black text-white",
      }}
    >
      Abonnement Inactif

    </Chip>
  )
}