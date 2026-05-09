import type { PageResponse } from "../domain/models/common/PaginationModels";
import type { RegisterUserRequest, UpdateUserRequest, UserInfo } from "../domain/models/users/UserModel";
import type { UserPort } from "../domain/ports/UserPort";
import { deleteProfileImageRequest, getUserByIdRequest, pageUsersRequest, registerUserRequest, toggleUserStatusRequest, updateProfileImageRequest, updateUserRequest } from "../../infrastructure/api/requests/users.request";

export class UserService implements UserPort {

    async getUserById(userId: string): Promise<UserInfo> {
        const user = getUserByIdRequest(userId);
        return user;
    }

    async pageUsers(page: number, pageSize: number, userName: string, email: string, enable: boolean): Promise<PageResponse<UserInfo>> {
        const pageResponse = await pageUsersRequest(page, pageSize, userName, email, enable);
        return pageResponse;
    }

    async registerUser(user: RegisterUserRequest): Promise<void> {
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

    async updateUser(user: UpdateUserRequest): Promise<void> {
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

    async updateProfileImage(userId: string, file: File): Promise<void> {
        await updateProfileImageRequest(userId, file);
    }

    async deleteProfileImage(userId: string): Promise<void> {
        await deleteProfileImageRequest(userId);
    }

}
