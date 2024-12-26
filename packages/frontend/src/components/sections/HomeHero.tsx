import { useTranslation } from "react-i18next";
import SectionContainer from "../shared/containers/SectionContainer";
import chatPhoneImg from "../../assets/imgs/chat-phone.png";
import { trim } from "../../utils/functions/general";
import useScrollInToView from "../../hooks/useScrollInToView";
import SectionHeader from "../shared/SectionHeader";

const HomeHero = () => {
  const { t, i18n } = useTranslation(["home"]);

  const { isInView, targetRef } = useScrollInToView();

  return (
    <SectionContainer
      className="bg-secondary"
      ref={targetRef}
      id="home-hero"
      dir="rtl"
      wraperClassName={`
        md:flex-row 
        items-center 
        justify-center 
        gap-4
        md:min-h-screen
        md:-mt-20`}
    >
      <img
        src={chatPhoneImg}
        alt="app"
        className={trim(`
          flex-1
          w-full
          md:max-w-[25%]
          max-w-[150px]
          block
          drop-shadow-2xl
          shadow-primary
          transition-all
          duration-500
          ease-in-out
          ${isInView ? "opacity-100" : "opacity-0"}`)}
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
        <SectionHeader
          title={t("hero.title")}
          className={`
            bg-primary
            text-secondary
            pt-2
            px-6
            md:!text-responsive-2xl
            rounded-full
            transition-all
            duration-500
            delay-300
            ease-in-out
            ${isInView ? "opacity-100" : "opacity-0"}
            ${isInView ? "translate-y-0" : "translate-y-10"}`}
        />

        <SectionHeader
          className={`
            ${i18n.language === "ar" ? "md:text-start" : "md:text-end"}
            text-center
            max-w-[450px]
            md:!text-responsive-xl
            duration-500
            delay-700
            ease-in-out
            ${isInView ? "opacity-100" : "opacity-0"}`}
          tag="h2"
          title={t("hero.subtitle")}
        />
      </div>
    </SectionContainer>
  );
};

export default HomeHero;
