import axios, { type AxiosResponse } from "axios";
import type { UserModel } from "../../../core/domain/models/users/UserModel";
import type { SessionValidationModel } from "../../../core/domain/models/auth/AuthModels";

const apiURL = import.meta.env.VITE_API_URL;

const httpClient = axios.create({
    baseURL: apiURL,
    withCredentials: true,
})

export const setupAxiosResponseInterceptor = (
    authUser: UserModel,
    validateAccess: () => Promise<SessionValidationModel>,
    verifySession: () => Promise<SessionValidationModel>,
    refreshSession: () => Promise<void>,
    logout: () => void
) => {

    httpClient.interceptors.response.use(
        (response: AxiosResponse) => response,
        async (error) => {
            const originalRequest = error.config;

            if (error.response &&
                error.response.status === 401 &&
                authUser &&
                authUser?.enable &&
                !originalRequest._retry
            ) {
                originalRequest._retry = true;

                try {
                    const validateAccessResponse = await validateAccess();
                    if (!validateAccessResponse.active) {
                        const validateSessionResponse = await verifySession();
                        if (validateSessionResponse.active) {
                            await refreshSession();
                            return httpClient(originalRequest);
                        } else {
                            logout();
                        }
                    }
                } catch (refreshError) {
                    logout();
                    return Promise.reject(refreshError);
                }
            }
            return Promise.reject(error);
        }
    )

}

export default httpClient;
