import { createContext } from "react";

interface AlertContextProps {
  showAlert: (message: string, duration?: number) => void;
}

export const AlertContext = createContext<AlertContextProps | undefined>(undefined);
