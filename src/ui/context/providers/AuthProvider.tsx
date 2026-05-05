import { useEffect, useRef, useState, type ReactNode } from "react"
import { AuthService } from "../../../core/use-cases/AuthUseCases";
import type { UserInfo } from "../../../core/domain/models/users/UserModel";
import executeTask from "../utils/TaskExecutor";
import { UserService } from "../../../core/use-cases/UserUseCases";
import type { LoginResponse } from "../../../core/domain/models/auth/AuthModels";
import { AuthContext, type AuthContextType } from "../AuthContext";

type Props = {
    children: ReactNode;
}

const authService = new AuthService();
const userService = new UserService();

function AuthProvider({ children }: Props) {
    // Basics
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    // Auth User Info
    const [authUser, setAuthUser] = useState<UserInfo | null>(null);
    // Refresh Info per Modification
    const [modifiedAuthUser, setModifiedAuthUser] = useState<boolean>(false);

    // Rest Methods
    const login = async (userName: string, password: string): Promise<boolean> => {
        setError(null);
        const response = await executeTask(() => authService.login(userName, password), setLoading, setError) as LoginResponse | null;
        if (!response) return false;
        const userInfo = await executeTask(() => userService.getUserById(response.userId), setLoading, setError);
        if (!userInfo) return false;
        setAuthUser(userInfo);
        return true;
    }

    const logout = async () => {
        await executeTask(() => authService.logout(), setLoading, setError);
        setAuthUser(null);
    }
     
    // Business Methods (Update Info)
    const updateUserImage = async (userId: string, file: File): Promise<boolean> => {
        const response = await executeTask(() => userService.updateProfileImage(userId, file), setLoading, setError);
        console.log(response);
        if (response !== null) {
            setModifiedAuthUser(true);
            return true;
        }
        return false;
    }

    /** useEffects */
    // Refresh Auth User Info
    useEffect(() => {
        // Private Methods
        const checkAuth = async () => {
            const response = await executeTask(() => authService.validateSession(), setLoading, setError);
            if (!response?.active) {
                setAuthUser(null);
                return;
            }
            const userInfo = await executeTask(() => userService.getUserById(response.userId), setLoading, setError);
            setAuthUser(userInfo);
        }
        checkAuth();
    }, []);


    // Refresh per Auth User Modification
    const authUserRef = useRef(authUser);
    // Mantain the ref sync with the actual state
    useEffect(() => {
        authUserRef.current = authUser;
    }, [authUser]);

    useEffect(() => {
        // Private Methods
        const refreshInfo = async () => {
            if (!modifiedAuthUser || !authUserRef.current) return;

            const userInfo = await executeTask(() => userService.getUserById(authUserRef.current!.userId), setLoading, setError);

            setAuthUser(userInfo);
            setModifiedAuthUser(false);
        };
        refreshInfo();
    }, [modifiedAuthUser]);

    /** Export values */
    const exportValues: AuthContextType = {
        loading,
        error,
        authUser,
        modifiedAuthUser,
        setModifiedAuthUser,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={exportValues}>{children}</AuthContext.Provider>
    )

}

export default AuthProvider;
