import type { LoginResponse, SessionValidation } from "../models/auth/AuthModels";

export interface AuthPort {
    login(username: string, password: string): Promise<LoginResponse>;
    logout(): Promise<void>;
    validateAccess(): Promise<SessionValidation>;
    validateSession(): Promise<SessionValidation>;
    refreshSession(): Promise<void>;
}