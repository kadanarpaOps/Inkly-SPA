
export interface RegisterUserRequest {
    userName: string;
    email: string;
    password: string;
}

export interface UpdateUserRequest {
    userId: string;
    userName: string;
    email: string;
    password: string;
}