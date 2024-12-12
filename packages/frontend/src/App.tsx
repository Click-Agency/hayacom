import Providers from "./providers";
import Layout from "./components/Layout";
import Routers from "./routers";
import "swiper/swiper-bundle.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

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
