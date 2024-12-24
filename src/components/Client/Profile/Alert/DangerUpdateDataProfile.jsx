import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BadgeX } from "lucide-react";

export const DangerUpdateDataProfile = () => {
  return (
    <Alert variant="destructive">
      <BadgeX className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        La mise à jour a échoué. Vérifiez vos informations et essayez à nouveau.
      </AlertDescription>
    </Alert>

  )
}