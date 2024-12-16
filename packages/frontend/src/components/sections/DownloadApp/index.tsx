import { useTranslation } from "react-i18next";
import SectionContainer from "../../shared/containers/SectionContainer";
import mobileImg from "../../../assets/imgs/mobile.png";
import appStoreImg from "../../../assets/imgs/app-store.png";
import playStoreImg from "../../../assets/imgs/play-store.png";
import { trim } from "../../../utils/functions/general";
import { Link } from "react-router-dom";

const storesArr = [
  {
    img: appStoreImg,
    alt: "app-store",
    link: "/",
  },
  {
    img: playStoreImg,
    alt: "play-store",
    link: "/",
  },
];

const DownloadApp = () => {
  const { t } = useTranslation(["home"]);

  return (
    <SectionContainer
      dir="rtl"
      wraperClassName="md:flex-row items-center justify-center gap-4"
    >
      <img
        src={mobileImg}
        alt="app"
        className={trim(`
          flex-1
          w-full
          md:max-w-[25%]
          max-w-[250px]`)}
      />

      <div
        className={trim(`
          flex-1
          flex
          flex-col
          gap-4
          justify-center
          items-center
          text-center
          md:max-w-[40%]`)}
      >
        <h1
          className={trim(`
            text-primary
            text-responsive-xl
            font-semibold
            text-shadow-lg`)}
        >
          {t("downloadApp.title")}
        </h1>

        <div
          className={trim(`
            flex 
            gap-2 
            items-center
            justify-center
            w-full
            flex-wrap`)}
        >
          {storesArr.map(({ img, alt, link }, i) => (
            <Link key={i} to={link} target="_blank">
              <img
                src={img}
                alt={alt}
                className={trim(`
                  block
                  w-full
                  max-w-48
                  rounded-xl
                  border-2
                  border-gray-500`)}
              />
            </Link>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
};

export default DownloadApp;
