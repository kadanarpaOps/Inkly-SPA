import { createContext } from "react";
import type { RegisterUserRequest, UpdateUserRequest, UserInfo } from "../../core/domain/models/users/UserModel";
import type { PageResponse } from "../../core/domain/models/common/PaginationModels";
import type { UpdatePasswordRequest } from "../../core/domain/models/users/UpdatePasswordRequest";
import type { UpdateEmailRequest } from "../../core/domain/models/users/UpdateEmailRequest";

export interface UserContextType {
    // Basics
    loading: boolean;
    error: string | null;
    // Searching
    pagedUsers: PageResponse<UserInfo> | null;
    searchingUsers: PageResponse<UserInfo> | null;
    // Refresh User Info
    modifiedUser: boolean;
    // Fetch Info per Modification
    setModifiedUser: (modified: boolean) => void;
    // Rest Methods
    findUserById: (userId: string) => Promise<UserInfo | null>;
    findPagedUsersResult: (page: number, pageSize: number,
        userName: string,
        email: string,
        enable: boolean) => Promise<PageResponse<UserInfo> | null>;
    findPagedUsersForSearch: (page: number, pageSize: number,
        userName: string,
        email: string,
        enable: boolean) => Promise<PageResponse<UserInfo> | null>;
    registerUser: (user: RegisterUserRequest) => Promise<boolean>;
    updateUser: (user: UpdateUserRequest) => Promise<void>;
    toggleUserStatus: (userId: string) => Promise<void>;
    updateForgottenPassword: (usernameOrEmail: string, request: UpdatePasswordRequest) => Promise<void>;
    updateEmail: (usernameOrEmail: string, request: UpdateEmailRequest) => Promise<void>;
}

export const UserContext = createContext<UserContextType | null>(null);
