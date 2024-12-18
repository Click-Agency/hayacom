import Comparisons from "../components/sections/Comparisons";
import Designs from "../components/sections/Designs";
import DownloadApp from "../components/sections/DownloadApp";
import Packages from "../components/sections/Packages";
import Testimonials from "../components/sections/Testimonials";
import PageContainer from "../components/shared/containers/PageContainer";

export default function Home() {
  return (
    <PageContainer paddingTop>
      <Packages />
      <Comparisons />
      <Designs />
      <Testimonials />
      <DownloadApp />
    </PageContainer>
  );
}
