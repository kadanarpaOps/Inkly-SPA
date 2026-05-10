import axios, { type AxiosResponse } from "axios";
import type { UserInfo } from "../../../core/domain/models/users/UserModel";
import type { SessionValidation } from "../../../core/domain/models/auth/AuthModels";

interface ImportMetaEnv {
    readonly VITE_API_URL: string;
}

interface ImportMeta {
    readonly env?: ImportMetaEnv;
}

const meta = import.meta as ImportMeta;

const apiURL = meta.env?.VITE_API_URL;

const httpClient = axios.create({
    baseURL: apiURL,
    withCredentials: true,
})

export const setupAxiosResponseInterceptor = (
    authUser: UserInfo | null,
    validateAccess: () => Promise<SessionValidation>,
    verifySession: () => Promise<SessionValidation>,
    refreshSession: () => Promise<void>,
    logout: () => void
) => {

    httpClient.interceptors.response.use(
        (response: AxiosResponse) => response,
        async (error) => {
            console.log("Interceptor triggered for error:", error);
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
                    console.log(validateAccessResponse);
                    if (!validateAccessResponse.active) {
                        const validateSessionResponse = await verifySession();
                        console.log(validateSessionResponse);
                        if (validateSessionResponse.active) {
                            await refreshSession();
                            console.log(originalRequest);
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
