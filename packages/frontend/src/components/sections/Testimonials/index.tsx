import { useTranslation } from "react-i18next";
import SectionContainer from "../../shared/containers/SectionContainer";
import SectionHeader from "../../shared/SectionHeader";
import iconHayakom from "../../../assets/imgs/icon-hayakom.png";
import useScrollInToView from "../../../hooks/useScrollInToView";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const testimonialsArr = Array.from({ length: 10 }, (_, i) => ({
  icon: iconHayakom,
  order: i + 1,
}));

const Testimonials = () => {
  const { t } = useTranslation(["home"]);

  const { targetRef, isInView } = useScrollInToView();

  return (
    <SectionContainer id="testimonials">
      <SectionHeader title={t("testimonials.title")} />

      <Swiper
        ref={targetRef as any}
        modules={[Autoplay]}
        slidesPerView={"auto"}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        spaceBetween={20}
        loop={testimonialsArr.length < 4 ? false : true}
        centerInsufficientSlides
        dir="ltr"
        wrapperTag="ul"
        className={t(`
          w-full
          rounded-xl 
          transition-[opacity,transform]
          duration-500
          ease-in-out
          ${isInView ? "translate-y-0" : "translate-y-10"}
          ${isInView ? "opacity-100" : "opacity-0"}`)}
      >
        {testimonialsArr.map(({ icon }, i) => (
          <SwiperSlide className="!w-auto" key={i} tag="li">
            <img className="block !w-auto max-w-32" src={icon} />
          </SwiperSlide>
        ))}
      </Swiper>
    </SectionContainer>
  );
};

export default Testimonials;
