import { useTranslation } from "react-i18next";
import SectionContainer from "../../../shared/containers/SectionContainer";
import SectionHeader from "../../../shared/SectionHeader";
import UpdateOrUpload from "./UpdateOrUpload";
import { Card } from "../../../../types/cards";

const Form = ({ cardData }: { cardData?: Card }) => {
  const { t } = useTranslation("admin");

  return (
    <SectionContainer
      className="justify-center h-full"
      wraperClassName="items-center"
    >
      <SectionHeader
        className="text-responsive-2xl"
        title={cardData ? t("cards.update.title") : t("cards.create.title")}
      />
      <UpdateOrUpload cardData={cardData} />
    </SectionContainer>
  );
};

export default Form;
