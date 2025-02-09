import CardsGallery from "../components/sections/CardsGallery";
import PageContainer from "../components/shared/containers/PageContainer";

export default function Designs() {
  return (
    <PageContainer paddingTop className="background-bubbles">
      {/* <DesignsHero /> */}
      <CardsGallery />
    </PageContainer>
  );
}
