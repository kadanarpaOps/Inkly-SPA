import type { PageResponse } from '../../../core/domain/models/common/PaginationModels';
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

export const registerUserRequest = async (user: RegisterUserRequest): Promise<void> => {
    await httpClient.post(`users`, user);
}

export const updateUserRequest = async (user: UpdateUserRequest): Promise<void> => {
    await httpClient.patch(`users/${user.userId}`, user);
}

export const toggleUserStatusRequest = async (userId: string): Promise<void> => {
    await httpClient.patch(`users/${userId}/toggle-status`);
}

export const updateProfileImageRequest = async (userId: string, image: File): Promise<void> => {
    const formData = new FormData();
    formData.append('file', image);

    await httpClient.patch(`users/${userId}/update-image`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

export const deleteProfileImageRequest = async (userId: string): Promise<void> => {
    await httpClient.delete(`users/${userId}/delete-image`);
}
