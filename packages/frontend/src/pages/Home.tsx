import Comparisons from "../components/sections/Comparisons";
import Designs from "../components/sections/Designs";
import ContactBanner from "../components/sections/ContactBanner";
import HomeHero from "../components/sections/HomeHero";
import Packages from "../components/sections/Packages";
import PageContainer from "../components/shared/containers/PageContainer";
import DownloadApp from "../components/sections/DownloadApp";

export default function Home() {
  return (
    <PageContainer className="background-bubbles">
      <HomeHero />
      <Packages />
      <Comparisons />
      <ContactBanner />
      <Designs />
      <DownloadApp />
    </PageContainer>
  );
}
