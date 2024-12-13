import { Navigate, Outlet, useLocation } from "react-router-dom";
import useSession from "../hooks/useSession";
import { appRoutes } from "../config";

const AuthGuard = () => {
  const session = useSession();
  const location = useLocation();

  return session?._id ? (
    <Outlet />
  ) : (
    <Navigate to={appRoutes.auth.login} state={{ from: location }} replace />
  );
};

export default AuthGuard;
