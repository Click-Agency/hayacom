import CardsGallery from "../components/sections/CardsGallery";
import DownloadApp from "../components/sections/DownloadApp";
import PageContainer from "../components/shared/containers/PageContainer";

export default function Designs() {
  return (
    <PageContainer className="background-bubbles">
      {/* <DesignsHero /> */}
      <CardsGallery />
      <DownloadApp />
    </PageContainer>
  );
}
