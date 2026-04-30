import { AxiosError } from "axios";

const executeTask = async <T,>(
    task: () => Promise<T>,
    setLoading: (loading: boolean) => void,
    setServerError: (error: string | null) => void
): Promise<T | null> => {
    setLoading(true);
    setServerError(null);
    try {
        return await task();
    } catch (error) {
        if (error instanceof AxiosError) {
            setServerError(error.response?.data?.message || "Ocurrió un error en el servidor");
        }
        return null;
    } finally {
        setLoading(false);
    }
}

export default executeTask;
