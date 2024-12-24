import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BadgeCheck } from "lucide-react";

export const SuccesUpdateDataProfile = () => {
  return (
    <Alert variant="success">
      <BadgeCheck className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        La mise à jour a échoué. Vérifiez vos informations et essayez à nouveau.
      </AlertDescription>
    </Alert>

  )
}