import type { RoleModel } from "./RoleModel";

export interface UserInfo {
    userId: string;
    userName: string;
    email: string;
    emailVerified: boolean;
    passwordVerified: boolean;
    enable: boolean;
    role: RoleModel;
    createdAt: Date;
    updatedAt: Date;
}

export interface RegisterUserRequest {
    userName: string;
    email: string;
    password: string;
}

export interface UpdateUserRequest {
    userId: string;
    userName?: string;
    email?: string;
    password?: string;
}