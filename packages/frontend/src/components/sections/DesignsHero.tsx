import { useTranslation } from "react-i18next";
import SectionContainer from "../shared/containers/SectionContainer";
import SectionHeader from "../shared/SectionHeader";
import weddingCardImg from "../../assets/imgs/wedding-card.png";
import useScrollInToView from "../../hooks/useScrollInToView";
import { trim } from "../../utils/functions/general";

const DesignsHero = () => {
  const { t } = useTranslation(["designs"]);

  const { targetRef, isInView } = useScrollInToView();

  return (
    <SectionContainer
      id="designs-hero"
      ref={targetRef}
      className="mt-5"
      wraperClassName="items-center"
    >
      <SectionHeader
        className={`
          !text-responsive-2xl
          transition-opacity
          duration-500
          ease-in-out
          ${isInView ? "opacity-100" : "opacity-0"}`}
        title={t("hero.title")}
      />
      <SectionHeader
        tag="h2"
        className={`
          transition-[transform,opacity]
          duration-500
          ease-in-out
          ${isInView ? "opacity-100" : "opacity-0"}
          ${isInView ? "translate-y-0" : "translate-y-7"}`}
        title={t("hero.subtitle")}
      />

      <img
        src={weddingCardImg}
        alt="wedding-card"
        className={trim(`
          block 
          w-full 
          max-w-[800px] 
          mt-10
          transition-opacity
          duration-500
          delay-300
          ease-in-out
          ${isInView ? "opacity-100" : "opacity-0"}`)}
      />
    </SectionContainer>
  );
};

export default DesignsHero;
