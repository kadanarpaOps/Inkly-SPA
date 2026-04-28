import type { PageResponse } from "../../core/domain/models/common/PaginationModels";
import type { UserModel } from "../../core/domain/models/users/UserModel";
import type { UserPort } from "../../core/domain/ports/UserPort";
import type { RegisterUserRequest, UpdateUserRequest } from "../api/interfaces/user.interfaces";
import { getUserByIdRequest, pageUsersRequest, registerUserRequest, toggleUserStatusRequest, updateUserRequest } from "../api/requests/users.request";

export class HttpUserAdapter implements UserPort {

    async getUserById(userId: string): Promise<UserModel> {
        const user = getUserByIdRequest(userId);
        return user;
    }

    async pageUsers(page: number, pageSize: number, userName: string, email: string, enable: boolean): Promise<PageResponse<UserModel>> {
        const pageResponse = pageUsersRequest(page, pageSize, userName, email, enable);
        return pageResponse;
    }

    async registerUser(user: UserModel): Promise<void> {
        const registerRequest: Partial<RegisterUserRequest> = {};
        if (user.userName && user.userName.trim() !== "") {
            registerRequest.userName = user.userName;
        }
        if (user.email && user.email.trim() !== "") {
            registerRequest.email = user.email;
        }
        if (user.password && user.password.trim() !== "") {
            registerRequest.password = user.password;
        }
        await registerUserRequest(registerRequest as RegisterUserRequest);
    }

    async updateUser(user: UserModel): Promise<void> {
        const updateRequest: Partial<UpdateUserRequest> = {};
        if (user.userName && user.userName.trim() !== "") {
            updateRequest.userName = user.userName;
        }
        if (user.email && user.email.trim() !== "") {
            updateRequest.email = user.email;
        }
        if (user.password && user.password.trim() !== "") {
            updateRequest.password = user.password;
        }
        await updateUserRequest(updateRequest as UpdateUserRequest);
    }

    async toggleUserStatus(userId: string): Promise<void> {
        await toggleUserStatusRequest(userId);
    }

    

}