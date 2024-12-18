import { useTranslation } from "react-i18next";
import SectionContainer from "../../shared/containers/SectionContainer";
import mobileImg from "../../../assets/imgs/mobile.png";
import appStoreImg from "../../../assets/imgs/app-store.png";
import playStoreImg from "../../../assets/imgs/play-store.png";
import { trim } from "../../../utils/functions/general";
import { Link } from "react-router-dom";
import useScrollInToView from "../../../hooks/useScrollInToView";

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

  const { isInView, targetRef } = useScrollInToView();

  return (
    <SectionContainer
      className="bg-secondary"
      ref={targetRef}
      id="download-app"
      dir="rtl"
      wraperClassName={`
        md:flex-row 
        items-center 
        justify-center 
        gap-4
        transition-all
        duration-500
        ease-in-out
        ${isInView ? "opacity-100" : "opacity-0"}`}
    >
      <img
        src={mobileImg}
        alt="app"
        className={trim(`
          flex-1
          w-full
          md:max-w-[25%]
          max-w-[130px]
          drop-shadow-2xl
          shadow-primary`)}
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
                  max-w-36
                  md:max-w-48
                  rounded-xl
                  border-2
                  border-gray-500
                  transition-all
                  duration-300
                  ease-in-out
                  hover:scale-105
                  active:scale-95`)}
              />
            </Link>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
};

export default DownloadApp;
