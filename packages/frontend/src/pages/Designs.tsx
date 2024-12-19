import CardsGallery from "../components/sections/CardsGallery";
import DesignsHero from "../components/sections/DesignsHero";
import DownloadApp from "../components/sections/DownloadApp";
import PageContainer from "../components/shared/containers/PageContainer";

export default function Designs() {
  return (
    <PageContainer paddingTop>
      <DesignsHero />
      <CardsGallery />
      <DownloadApp />
    </PageContainer>
  );
}
