import { useTranslation } from "react-i18next";
import { TbError404 } from "react-icons/tb";
import ButtonStyled from "./ButtonStyled";
import { appRoutes } from "../../config";

const FourOFour = () => {
  const { t } = useTranslation(["common"]);

  return (
    <div className="flex flex-col h-full justify-center items-center">
      <TbError404 size={200} color="#730f20" />
      <h3 className="text-3xl font-semibold text-primary mb-4">
        {t("notFound")}
      </h3>
      <ButtonStyled ripple bg hover href={appRoutes.home} title={t("goHome")} />
    </div>
  );
};

export default FourOFour;
