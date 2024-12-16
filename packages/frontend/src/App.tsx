import Providers from "./providers";
import Layout from "./components/Layout";
import Routers from "./routers";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "swiper/swiper-bundle.css";

export default function App() {
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
