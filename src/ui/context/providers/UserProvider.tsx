import { useState, type ReactNode } from "react"
import type { PageResponse } from "../../../core/domain/models/common/PaginationModels";
import type { UserInfo } from "os";
import executeTask from "../utils/TaskExecutor";
import { UserService } from "../../../core/use-cases/UserUseCases";
import type { RegisterUserRequest, UpdateUserRequest } from "../../../core/domain/models/users/UserModel";

type Props = {
    children: ReactNode;
}

const userService = new UserService();

function UserProvider({ children }: Props) {
    // Basics
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    //Searching
    const [pagedUsers, setPagedUsers] = useState<PageResponse<UserInfo> | null>(null);
    const [searchingUsers, setSearchingUsers] = useState<PageResponse<UserInfo> | null>(null);
    // Refersh Info per modification
    const [modifiedUser, setModifiedUser] = useState<boolean>(false);

    // Rest Methods
    const findUserById = (userId: string) => {
        executeTask(() => userService.getUserById(userId), setLoading, setError);
    }

    const findPagedUsersResult = async (page: number, pageSize: number, userName: string, email: string, enable: boolean) => {
        const response = await executeTask(() => userService.pageUsers(page, pageSize, userName, email, enable), setLoading, setError);
        setPagedUsers(response);
    }

    const findPagedUsersForSearch = async (page: number, pageSize: number, userName: string, email: string, enable: boolean) => {
        const response = await executeTask(() => userService.pageUsers(page, pageSize, userName, email, enable), setLoading, setError);
        setSearchingUsers(response);
    }

    const registerUser = (data: RegisterUserRequest) => {
        executeTask(() => userService.registerUser(data), setLoading, setError);
    }

    const updateUser = (data: UpdateUserRequest) => {
        executeTask(() => userService.updateUser(data), setLoading, setError);
    }

    const toggleUserStatus = (userId: string) => {
        executeTask(() => userService.toggleUserStatus(userId), setLoading, setError);
    }

}
