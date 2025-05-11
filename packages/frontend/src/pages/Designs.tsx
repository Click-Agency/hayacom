import CardsGallery from "../components/sections/CardsGallery";
import DownloadApp from "../components/sections/DownloadApp";
import PageContainer from "../components/shared/containers/PageContainer";
import { useTranslation } from "react-i18next";

export default function Designs() {
  const { i18n } = useTranslation();

  return (
    <PageContainer
      className={
        i18n.dir() === "ltr"
          ? "background-bubbles"
          : "background-bubbles-reverse"
      }
    >
      {/* <DesignsHero /> */}
      <CardsGallery />
      <DownloadApp />
    </PageContainer>
  );
}
