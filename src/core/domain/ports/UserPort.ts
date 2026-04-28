import type { PageResponse } from "../models/common/PaginationModels";
import type { UserModel } from "../models/users/UserModel";

export interface UserPort {
    getUserById(userId: string): Promise<UserModel>;
    pageUsers(page: number, pageSize: number,
        userName: string,
        email: string,
        enable: boolean
    ): Promise<PageResponse<UserModel>>;
    registerUser(user: UserModel): Promise<void>;
    updateUser(user: UserModel): Promise<void>;
    toggleUserStatus(userId: string): Promise<void>;
}