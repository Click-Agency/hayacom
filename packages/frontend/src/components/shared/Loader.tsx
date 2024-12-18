import { useTranslation } from "react-i18next";
import { PuffLoader } from "react-spinners";

const Loader = ({ className = "" }: { className?: string }) => {
  const { t } = useTranslation(["common"]);

  return (
    <div
      className={`
        flex
        flex-col
        h-full
        justify-center
        items-center
        ${className}`}
    >
      <PuffLoader size={200} color="#730f20" />
      <h3 className="text-3xl font-semibold text-primary mt-4">
        {t("loading")}
      </h3>
    </div>
  );
};

export default Loader;
