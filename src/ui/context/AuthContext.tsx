import { createContext } from "react";
import type { UserInfo } from "../../core/domain/models/users/UserModel";
import type { SessionValidation } from "../../core/domain/models/auth/AuthModels";
import type { VerificationRequest } from "../../core/domain/models/verify/VerificationRequest";

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
    deleteUserImage: (userId: string) => Promise<boolean>;
    validateAccess: () => Promise<SessionValidation>;
    validateSession: () => Promise<SessionValidation>;
    refreshSession: () => Promise<void>;
    createVerificationCode: (request: VerificationRequest) => Promise<void>;
    verifyCode: (request: VerificationRequest) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);
