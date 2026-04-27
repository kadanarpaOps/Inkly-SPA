export interface LoginRequestModel {
    username: string;
    password: string;
}

export interface LoginResponseModel {
    userId: string;
}

export interface SessionValidationModel {
    active: boolean;
}