import Comparisons from "../components/sections/Comparisons";
import Designs from "../components/sections/Designs";
import ContactBanner from "../components/sections/ContactBanner";
import HomeHero from "../components/sections/HomeHero";
import Packages from "../components/sections/Packages";
import PageContainer from "../components/shared/containers/PageContainer";
import DownloadApp from "../components/sections/DownloadApp";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { i18n } = useTranslation();

  return (
    <PageContainer
      className={
        i18n.dir() === "ltr"
          ? "background-bubbles"
          : "background-bubbles-reverse"
      }
    >
      <HomeHero />
      <Packages />
      <Comparisons />
      <ContactBanner />
      <Designs />
      <DownloadApp />
    </PageContainer>
  );
}
