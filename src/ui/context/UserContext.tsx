import { createContext } from "react";
import type { UserInfo } from "../../core/domain/models/users/UserModel";
import type { PageResponse } from "../../core/domain/models/common/PaginationModels";

export interface UserContextType {
    // Basics
    loading: boolean;
    error: string | null;
    // Searching
    pagedUsers: PageResponse<UserInfo> | null;
    searchingUsers: PageResponse<UserInfo> | null;
    // Fetch Info per Modification
    setModifiedUser: (modified: boolean) => void;
    // Rest Methods
    findUserById: (userId: string) => Promise<UserInfo | null>;
    pageUsers: (page: number, pageSize: number,
        userName: string,
        email: string,
        enable: boolean) => Promise<void>;
    registerUser: (user: UserInfo) => Promise<void>;
    updateUser: (user: UserInfo) => Promise<void>;
    toggleUserStatus: (userId: string) => Promise<void>;
}

export const UserContext = createContext<UserContextType>({
    loading: false,
    error: null,
    pagedUsers: null,
    searchingUsers: null,
    setModifiedUser: () => {},
    findUserById: async () => null,
    pageUsers: async () => {},
    registerUser: async () => {},
    updateUser: async () => {},
    toggleUserStatus: async () => {},
});