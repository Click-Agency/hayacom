import { useTranslation } from "react-i18next";
import SectionContainer from "../../shared/containers/SectionContainer";
import SectionHeader from "../../shared/SectionHeader";
import useScrollInToView from "../../../hooks/useScrollInToView";
import googlePlay from "../../assets/imgs/google-play.png";
import appStore from "../../assets/imgs/app-store.png";
import info from "../../../config/info";
import ButtonImg from "./ButtonImg";
import { trim } from "../../../utils/functions/general";

const DownloadApp = () => {
  const { t } = useTranslation(["home"]);
  const { isInView, targetRef } = useScrollInToView();

  return (
    <SectionContainer
      dir="ltr"
      id={"downloadApp"}
      className={`
        bg-background-tertiary/50
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
