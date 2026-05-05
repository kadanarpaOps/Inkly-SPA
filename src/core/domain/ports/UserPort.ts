import type { PageResponse } from "../models/common/PaginationModels";
import type { RegisterUserRequest, UpdateUserRequest, UserInfo } from "../models/users/UserModel";

export interface UserPort {
    getUserById(userId: string): Promise<UserInfo>;
    pageUsers(page: number, pageSize: number,
        userName: string,
        email: string,
        enable: boolean
    ): Promise<PageResponse<UserInfo>>;
    registerUser(user: RegisterUserRequest): Promise<void>;
    updateUser(user: UpdateUserRequest): Promise<void>;
    toggleUserStatus(userId: string): Promise<void>;
    updateProfileImage(userId: string, file: File): Promise<void>;
}