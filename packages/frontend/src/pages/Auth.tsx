import { useNavigate, useSearchParams } from "react-router-dom";
import PageContainer from "../components/shared/containers/PageContainer";
import NotFound from "./NotFound";
import useSession from "../hooks/useSession";
import { appRoutes } from "../config";
import { useEffect } from "react";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import AuthQuery from "../enum/Auth";

export default function Auth() {
  const push = useNavigate();
  const [query] = useSearchParams();
  const session = useSession();

  const ref = query.get("ref");

  useEffect(() => {
    if (session && ref !== AuthQuery.REGISTER) push(appRoutes.home);
    if (!session && ref === AuthQuery.REGISTER) push(appRoutes.auth.login);
  }, [session, push]);

  if (
    !ref ||
    (ref.toLowerCase() !== AuthQuery.LOGIN &&
      ref.toLowerCase() !== AuthQuery.REGISTER)
  )
    return <NotFound />;

  return (
    <PageContainer className="justify-center">
      {ref === AuthQuery.REGISTER && <Register />}
      {ref === AuthQuery.LOGIN && <Login />}
    </PageContainer>
  );
}
