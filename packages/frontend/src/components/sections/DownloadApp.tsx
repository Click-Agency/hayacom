import { useTranslation } from "react-i18next";
import SectionContainer from "../shared/containers/SectionContainer";
import SectionHeader from "../shared/SectionHeader";
import useScrollInToView from "../../hooks/useScrollInToView";
import googlePlay from "../../assets/imgs/google-play.png";
import appStore from "../../assets/imgs/app-store.png";
import { trim } from "../../utils/functions/general";
import info from "../../config/info";

const ButtonImg = ({
  src,
  alt,
  link,
}: {
  src: string;
  alt: string;
  link: string;
}) => (
  <a href={link} target="_blank" rel="noreferrer">
    <img
      src={src}
      alt={alt}
      className={trim(`
        flex-1
        w-full
        max-w-[200px]
        md:max-w-[250px]
        drop-shadow-2xl
        shadow-primary
        hover:shadow-2xl
        transition-all
        duration-300
        ease-in-out
        hover:scale-105
        cursor-pointer
        active:scale-95
        rounded-lg`)}
    />
  </a>
);

const DownloadApp = () => {
  const { t } = useTranslation(["home"]);
  const { isInView, targetRef } = useScrollInToView();

  return (
    <SectionContainer
      dir="ltr"
      id={"downloadApp"}
      className={`
        bg-gradient-background-light
        pb-28
        !mb-0`}
      wraperClassName="gap-4"
    >
      <SectionHeader title={t("downloadApp.title")} className="mt-10" />

      <div
        ref={targetRef}
        className={trim(` 
          flex
          flex-col
          md:flex-row 
          items-center 
          justify-center
          gap-6
          md:gap-12
          transition-all
          duration-500
          ease-in-out
          ${isInView ? "opacity-100" : "opacity-0"}`)}
      >
        <ButtonImg
          src={googlePlay}
          alt="google-play"
          link={info.appLinks.googlePlay}
        />

        <ButtonImg
          src={appStore}
          alt="app-store"
          link={info.appLinks.appStore}
        />
      </div>
    </SectionContainer>
  );
};

export default DownloadApp;
