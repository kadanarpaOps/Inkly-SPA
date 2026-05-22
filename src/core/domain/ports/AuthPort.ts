import type { LoginResponse, SessionValidation } from "../models/auth/AuthModels";
import type { VerificationRequest } from "../models/verify/VerificationRequest";

export interface AuthPort {
    login(username: string, password: string): Promise<LoginResponse>;
    logout(): Promise<void>;
    validateAccess(): Promise<SessionValidation>;
    validateSession(): Promise<SessionValidation>;
    refreshSession(): Promise<void>;
    createVerificationCode(request: VerificationRequest): Promise<void>;
    verifyCode(request: VerificationRequest): Promise<void>;
}