import { useCallback, useState, type ReactNode } from "react"
import type { PageResponse } from "../../../core/domain/models/common/PaginationModels";
import type { UserInfo } from "../../../core/domain/models/users/UserModel";
import executeTask from "../utils/TaskExecutor";
import { UserService } from "../../../core/use-cases/UserUseCases";
import type { RegisterUserRequest, UpdateUserRequest } from "../../../core/domain/models/users/UserModel";
import { UserContext, type UserContextType } from "../UserContext";
import { useAlert } from "../../hooks/useAlert";
import type { UpdatePasswordRequest } from "../../../core/domain/models/users/UpdatePasswordRequest";
import type { UpdateEmailRequest } from "../../../core/domain/models/users/UpdateEmailRequest";

type Props = {
    children: ReactNode;
}

const userService = new UserService();

function UserProvider({ children }: Props) {
    // Alert Component
    const { showAlert } = useAlert();
    // Basics
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    //Searching
    const [pagedUsers, setPagedUsers] = useState<PageResponse<UserInfo> | null>(null);
    const [searchingUsers, setSearchingUsers] = useState<PageResponse<UserInfo> | null>(null);
    // Refersh Info per modification
    const [modifiedUser, setModifiedUser] = useState<boolean>(false);

    // Rest Methods
    const findUserById = useCallback(async (userId: string) => {
        const response = executeTask(() => userService.getUserById(userId), setLoading, setError);
        return response;
    }, []);

    const findPagedUsersResult = useCallback(async (page: number, pageSize: number, userName: string, email: string, enable: boolean) => {
        const response = await executeTask(() => userService.pageUsers(page, pageSize, userName, email, enable), setLoading, setError);
        setPagedUsers(response);
        return response;
    }, []);

    const findPagedUsersForSearch = useCallback(async (page: number, pageSize: number, userName: string, email: string, enable: boolean) => {
        const response = await executeTask(() => userService.pageUsers(page, pageSize, userName, email, enable), setLoading, setError);
        setSearchingUsers(response);
        return response;
    }, []);

    const registerUser = async (data: RegisterUserRequest): Promise<boolean> => {
        const response = await executeTask(() => userService.registerUser(data), setLoading, setError, showAlert, true);
        console.log(response);
        if (!response) return false;
        return true;
    };

    const updateUser = async (data: UpdateUserRequest) => {
        await executeTask(() => userService.updateUser(data), setLoading, setError, showAlert, true);
        setModifiedUser(true);
    };

    const toggleUserStatus = async (userId: string) => {
        await executeTask(() => userService.toggleUserStatus(userId), setLoading, setError);
    };

    const updateForgottenPassword = async (usernameOrEmail: string, passwordRequest: UpdatePasswordRequest) => {
        await executeTask(() => userService.updateForgottenPassword(usernameOrEmail, passwordRequest), setLoading, setError, showAlert, true);
    }

    const updateEmail = async (usernameOrEmail: string, emailRequest: UpdateEmailRequest) => {
        await executeTask(() => userService.updateEmail(usernameOrEmail, emailRequest), setLoading, setError, showAlert, true);
    }

    // Export Values
    const exportValues: UserContextType = {
        loading,
        error,
        pagedUsers,
        searchingUsers,
        modifiedUser,
        setModifiedUser,
        findUserById,
        findPagedUsersResult,
        findPagedUsersForSearch,
        registerUser,
        updateUser,
        toggleUserStatus,
        updateForgottenPassword,
        updateEmail
    };

    return (
        <UserContext.Provider value={exportValues}>{children}</UserContext.Provider>
    )

}

export default UserProvider;
