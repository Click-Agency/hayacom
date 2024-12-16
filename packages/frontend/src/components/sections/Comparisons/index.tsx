import { useTranslation } from "react-i18next";
import SectionContainer from "../../shared/containers/SectionContainer";
import SectionHeader from "../../shared/SectionHeader";

const Comparisons = () => {
  const { t } = useTranslation(["home"]);

  return (
    <SectionContainer>
      <SectionHeader title={t("comparisons.title")} />
      <table>Table</table>
    </SectionContainer>
  );
};

export default Comparisons;
