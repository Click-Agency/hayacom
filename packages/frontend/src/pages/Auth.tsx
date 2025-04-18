import { useNavigate, useSearchParams } from "react-router-dom";
import PageContainer from "../components/shared/containers/PageContainer";
import NotFound from "./NotFound";
import useSession from "../hooks/useSession";
import { appRoutes } from "../config";
import { useEffect } from "react";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import AuthQuery from "../enum/Auth";
import SectionContainer from "../components/shared/containers/SectionContainer";

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
    <PageContainer className={`background-bubbles`}>
      <SectionContainer
        className="!m-0 !p-0"
        wraperClassName="items-center !m-0 md:!w-1/2 !p-0 md:bg-white"
      >
        {ref === AuthQuery.REGISTER && <Register />}
        {ref === AuthQuery.LOGIN && <Login />}
      </SectionContainer>
    </PageContainer>
  );
}
