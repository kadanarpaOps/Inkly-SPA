import type { PageResponse } from "../models/common/PaginationModels";
import type { UpdateEmailRequest } from "../models/users/UpdateEmailRequest";
import type { UpdatePasswordRequest } from "../models/users/UpdatePasswordRequest";
import type { RegisterUserRequest, UpdateUserRequest, UserInfo } from "../models/users/UserModel";

export interface UserPort {
    getUserById(userId: string): Promise<UserInfo>;
    pageUsers(page: number, pageSize: number,
        userName: string,
        email: string,
        enable: boolean
    ): Promise<PageResponse<UserInfo>>;
    registerUser(user: RegisterUserRequest): Promise<string>;
    updateUser(user: UpdateUserRequest): Promise<void>;
    toggleUserStatus(userId: string): Promise<void>;
    updateProfileImage(userId: string, file: File): Promise<void>;
    deleteProfileImage(userId: string): Promise<void>;
    updateForgottenPassword(usernameOrEmail: string, passwordRequest: UpdatePasswordRequest): Promise<void>;
    updateEmail(usernameOrEmail: string, emailRequest: UpdateEmailRequest): Promise<void>;
}