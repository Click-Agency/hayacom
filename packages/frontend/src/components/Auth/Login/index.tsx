import { useTranslation } from "react-i18next";
import { trim } from "../../../utils/functions/general";
import SectionContainer from "../../shared/containers/SectionContainer";
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
        <h1 className="text-center text-2xl font-bold text-primary">
          {t("login.title")}
        </h1>
        <Form />
      </div>
    </SectionContainer>
  );
};

export default Login;
