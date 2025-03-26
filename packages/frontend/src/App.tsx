import Providers from "./providers";
import Layout from "./components/Layout";
import Routers from "./routers";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "swiper/swiper-bundle.css";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

export default function App() {
  console.log(import.meta.env.VITE_API_BASE_URL);
  return (
    <Providers>
      <Layout>
        <Header />
        <Routers />
        <Footer />
      </Layout>
    </Providers>
  );
}
