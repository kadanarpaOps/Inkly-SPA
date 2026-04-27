import type { RoleModel } from "./RoleModel";

export interface UserModel {
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