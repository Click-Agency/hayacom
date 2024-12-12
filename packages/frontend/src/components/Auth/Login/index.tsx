import { useTranslation } from "react-i18next";
import { appRoutes } from "../../../config";
import { trim } from "../../../utils/functions/general";
import SectionContainer from "../../shared/containers/SectionContainer";
import Switcher from "../../shared/Switcher";
import Form from "./Form";

const Login = () => {
  const { t } = useTranslation(["auth"]);

  return (
    <SectionContainer className="animate-appear" wraperClassName="items-center">
      <div
        className={trim(`
          flex 
          flex-col
          bg-background-primary
          gap-4 
          border 
          w-full 
          max-w-[400px] 
          p-7 
          rounded-lg
          shadow-lg`)}
      >
        <Switcher
          title={t("login.register")}
          className="border-y-0 border-b pt-0"
          btn={{ title: t("register.title"), link: appRoutes.auth.register }}
        />
        <Form />
      </div>
    </SectionContainer>
  );
};

export default Login;
