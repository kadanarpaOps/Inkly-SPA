import { createContext } from "react";
import type { UserInfo } from "../../core/domain/models/users/UserModel";

export interface AuthContextType {
    // Basics
    loading: boolean;
    error: string | null;
    // Auth User Info
    authUser: UserInfo | null;
    // Refresh Auth User Info
    modifiedAuthUser: boolean;
    // Fetch Info per Modification
    setModifiedAuthUser: (modified: boolean) => void;
    // Rest Methods
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
    updateUserImage: (userId: string, file: File) => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextType | null>(null);
