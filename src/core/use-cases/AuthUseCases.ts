import { createVerificationCode, loginRequest, logoutRequest, refreshSessionRequest, verifyAccessTokenRequest, verifyCode, verifyRefreshTokenRequest } from "../../infrastructure/api/requests/auth.requests";
import type { LoginRequest, LoginResponse, SessionValidation } from "../domain/models/auth/AuthModels";
import type { VerificationRequest } from "../domain/models/verify/VerificationRequest";
import type { AuthPort } from "../domain/ports/AuthPort";

export class AuthService implements AuthPort {

    async login(username: string, password: string): Promise<LoginResponse> {
        const loginData: LoginRequest = { username, password };
        const loginResponse = await loginRequest(loginData);
        return loginResponse;
    }

    async logout(): Promise<void> {
        await logoutRequest();
    }

    async validateAccess(): Promise<SessionValidation> {
        const validationResponse = await verifyAccessTokenRequest();
        return validationResponse;
    }

    async validateSession(): Promise<SessionValidation> {
        const validationResponse = await verifyRefreshTokenRequest();
        return validationResponse;
    }

    async refreshSession(): Promise<void> {
        await refreshSessionRequest();
    }

    async createVerificationCode(request: VerificationRequest): Promise<void> {
        await createVerificationCode(request);
    }
    
    async verifyCode(request: VerificationRequest): Promise<void> {
        await verifyCode(request);
    }
}