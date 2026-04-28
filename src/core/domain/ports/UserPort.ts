import type { PageResponse } from "../models/common/PaginationModels";
import type { UserInfo } from "../models/users/UserModel";

export interface UserPort {
    getUserById(userId: string): Promise<UserInfo>;
    pageUsers(page: number, pageSize: number,
        userName: string,
        email: string,
        enable: boolean
    ): Promise<PageResponse<UserInfo>>;
    registerUser(user: UserInfo): Promise<void>;
    updateUser(user: UserInfo): Promise<void>;
    toggleUserStatus(userId: string): Promise<void>;
}