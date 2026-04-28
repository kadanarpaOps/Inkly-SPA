export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    userId: string;
}

export interface SessionValidation {
    active: boolean;
}