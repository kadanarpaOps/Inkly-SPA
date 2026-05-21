import type { PageResponse } from '../../../core/domain/models/common/PaginationModels';
import type { UpdateEmailRequest } from '../../../core/domain/models/users/UpdateEmailRequest';
import type { UpdatePasswordRequest } from '../../../core/domain/models/users/UpdatePasswordRequest';
import type { RegisterUserRequest, UpdateUserRequest, UserInfo } from '../../../core/domain/models/users/UserModel';
import httpClient from '../config/axios.instance';

export const getUserByIdRequest = async (userId: string): Promise<UserInfo> => {
    const response = await httpClient.get(`users/${userId}`);
    return response.data;
}

export const pageUsersRequest = async (
    page: number,
    size: number,
    userName: string,
    email: string,
    enable: boolean
): Promise<PageResponse<UserInfo>> => {
    const response = await httpClient.get(`users`, {
        params: { page, size, userName, email, enable }
    });
    return response.data;
}

export const registerUserRequest = async (user: RegisterUserRequest): Promise<string> => {
    const response = await httpClient.post(`users`, user);
    return response.status.toString();
}

export const updateUserRequest = async (user: UpdateUserRequest): Promise<void> => {
    const response = await httpClient.patch(`users/${user.userId}`, user);
    return response.data;
}

export const toggleUserStatusRequest = async (userId: string): Promise<void> => {
    const response = await httpClient.patch(`users/${userId}/toggle-status`);
    return response.data;
}

export const updateProfileImageRequest = async (userId: string, image: File): Promise<void> => {
    const formData = new FormData();
    formData.append('file', image);

    const response = await httpClient.patch(`users/${userId}/update-image`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
}

export const deleteProfileImageRequest = async (userId: string): Promise<void> => {
    const response = await httpClient.delete(`users/${userId}/delete-image`);
    return response.data;
}

export const updateForgottenPassword = async (usernameOrEmail: string, passwordRequest: UpdatePasswordRequest): Promise<void> => {
    const response = await httpClient.patch(`users/${usernameOrEmail}/update-password`, passwordRequest);
    return response.data;
}

export const updateEmail = async(usernameOrEmail: string, emailRequest: UpdateEmailRequest): Promise<void> => {
    const response = await httpClient.patch(`users/${usernameOrEmail}/update-email`, emailRequest);
    return response.data;
}
