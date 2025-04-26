import { useTranslation } from "react-i18next";
import SectionContainer from "../shared/containers/SectionContainer";
import { trim } from "../../utils/functions/general";
import useScrollInToView from "../../hooks/useScrollInToView";
import SectionHeader from "../shared/SectionHeader";
import appPhone from "../../assets/imgs/mobile.png";

const HomeHero = () => {
  const { t, i18n } = useTranslation(["home"]);

  const { isInView, targetRef } = useScrollInToView();

  return (
    <SectionContainer
      ref={targetRef}
      id="home-hero"
      wraperClassName={`
        md:flex-row
        flex-col-reverse
        items-center 
        justify-between 
        gap-4
        mt-10
        md:mt-0
        md:min-h-screen
        md:-mt-20`}
    >
      <div
        className={trim(`
          flex-1
          flex
          flex-col
          gap-4
          justify-center
          items-start
          md:max-w-[40%]`)}
      >
        <SectionHeader
          className={`
            text-start
            max-w-[700px]
            md:!text-responsive-2lg
            duration-500
            delay-700
            ease-in-out
            pb-5
            ${isInView ? "opacity-100" : "opacity-0"}`}
          tag="h2"
          title={t("hero.subtitle")}
        />

        <SectionHeader
          title={t("hero.title")}
          className={`
            !text-start
            text-responsive-md
            transition-all
            duration-500
            delay-300
            ease-in-out
            !font-normal
            !text-black
            ${isInView ? "opacity-100" : "opacity-0"}
            ${isInView ? "translate-y-0" : "translate-y-10"}`}
        />
      </div>

      <img
        src={appPhone}
        alt="app"
        className={trim(`
          flex-1
          w-full
          md:max-w-[28%]
          max-w-[150px]
          block
          drop-shadow-2xl
          shadow-primary
          transition-[opacity]
          duration-500
          ease-in-out
          ${i18n.dir() === "rtl" ? "-scale-x-100":""}
          ${isInView ? "opacity-100" : "opacity-0"}`)}
      />
    </SectionContainer>
  );
};

export default HomeHero;
