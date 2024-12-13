import { useTranslation } from "react-i18next";
import SectionContainer from "../../../shared/containers/SectionContainer";
import SectionHeader from "../../../shared/SectionHeader";
import UpdateOrUpload from "./UpdateOrUpload";
import { Package } from "../../../../types/packages";

const Form = ({ packageData }: { packageData?: Package }) => {
  const { t } = useTranslation("admin");

  return (
    <SectionContainer>
      <SectionHeader
        className="text-responsive-2xl"
        title={
          packageData ? t("packages.update.title") : t("packages.create.title")
        }
      />
      <UpdateOrUpload packageData={packageData} />
    </SectionContainer>
  );
};

export default Form;
