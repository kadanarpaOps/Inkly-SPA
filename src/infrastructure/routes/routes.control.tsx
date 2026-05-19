import { Outlet, useNavigate } from "react-router";
import { useAuth } from "../../ui/hooks/useAuth"
import { useEffect } from "react";

export const ProtectedRoute = ({ requiredRoles }: { requiredRoles: string[] }) => {
  const { authUser, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
        if (loading) return;

        if (authUser === null) {
            navigate("/unauthorized");
            return;
        }

        if (requiredRoles.length > 0) {
            const hasRoles = requiredRoles.some((r) => String(authUser?.role.roleName) === String(r));
            if (!hasRoles) {
                navigate("/forbidden");
                return;
            }
        }
    }, [authUser, loading, requiredRoles, navigate]);

    if (loading) {
        return null;
    }

    if (authUser === null) {
        return null;
    }

    if (requiredRoles.length > 0) {
        const hasRoles = requiredRoles.some((r) => String(authUser?.role.roleName) === String(r));
        if (!hasRoles) {
            return null;
        }
    }

  return <Outlet/>
}