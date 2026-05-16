import { useState, type ReactNode } from "react"
import { AlertContext } from "../AlertContext";
import Alert from "../../components/alert/Alert";

function AlertProvider({children}: {children: ReactNode}) {
  const [alert, setAlert] = useState<{ message: string; duration?: number } | null>(null);

  const showAlert = (message: string, duration = 10000) => {
    setAlert({ message, duration });
  }

  const handleClose = () => setAlert(null);
  return (
    <AlertContext.Provider value={{showAlert}}>
      {children}
      {alert && (
        <Alert
          message={alert.message}
          duration={alert.duration}
          onClose={handleClose}
        />
      )}
    </AlertContext.Provider>
  );
}

export default AlertProvider
