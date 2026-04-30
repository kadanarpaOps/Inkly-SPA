import { createContext } from "react";
import type { RegisterUserRequest, UpdateUserRequest, UserInfo } from "../../core/domain/models/users/UserModel";
import type { PageResponse } from "../../core/domain/models/common/PaginationModels";

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
        enable: boolean) => Promise<void>;
    findPagedUsersForSearch: (page: number, pageSize: number,
        userName: string,
        email: string,
        enable: boolean) => Promise<void>;
    registerUser: (user: RegisterUserRequest) => Promise<void>;
    updateUser: (user: UpdateUserRequest) => Promise<void>;
    toggleUserStatus: (userId: string) => Promise<void>;
}

export const UserContext = createContext<UserContextType | null>(null);
