import {useThemeContext} from "../../Context/ThemeContext.jsx";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


export const AlertBox = () => {
  const {MessageAlert, StatusAlert} = useThemeContext();
  
  return (
    <>
      
        <div className="fixed top-4 right-8 p-1 z-50 rounded-3xl shadow z-2000 h-[100px] w-[180px]">
          <Alert variant={StatusAlert}>
            {StatusAlert === "success" ? (
            <div>
              <BadgeCheck className="h-4 w-4" />
              <AlertTitle>Succès</AlertTitle>
            </div>
            ) : (
            <div>
              <BadgeX className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
            </div>
            )}
            <AlertDescription>
              {MessageAlert}
            </AlertDescription>
          </Alert>
        </div>
      
    </>
  )
  
  
  
  
}