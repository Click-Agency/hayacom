import { useTranslation } from "react-i18next";
import SectionContainer from "../../shared/containers/SectionContainer";
import SectionHeader from "../../shared/SectionHeader";
import { useEffect, useState } from "react";
import { getCards } from "../../../api/routes/cards";
import { Card } from "../../../types/cards";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import Loader from "../../shared/Loader";
import { trim } from "../../../utils/functions/general";
import useScrollInToView from "../../../hooks/useScrollInToView";
import GalleryCard from "../../shared/GalleryCard";
import ButtonStyled from "../../shared/ButtonStyled";
import { appRoutes } from "../../../config";

const Designs = () => {
  const { t } = useTranslation(["home"]);
  const [cards, setCards] = useState<Card[]>([]);
  const [noCards, setNoCards] = useState(false);
  const { isInView, targetRef } = useScrollInToView();

  useEffect(() => {
    const getSomeCards = async () => {
      try {
        setNoCards(() => false);
        const res = await getCards({ limit: 10 });

        if (!res.data) {
          setNoCards(() => true);
          return;
        }

        setCards(() => res.data.data);
      } catch (e) {
        setNoCards(() => true);
      }
    };

    getSomeCards();
  }, []);

  return (
    <SectionContainer
      id={"designs"}
      ref={targetRef}
      className={`
        bg-background-tertiary/50
        rounded-tl-[20%]
        pb-28
        !mb-0`}
      wraperClassName="gap-4"
    >
      <SectionHeader title={t("designs.title")} className="mt-10" />

      {!cards.length && !noCards ? (
        <Loader />
      ) : noCards ? (
        <div>
          <h2
            className={trim(`
              text-center 
              text-responsive-md 
              font-semibold
              text-primary
              mt-2`)}
          >
            {t("designs.noCards")}
          </h2>
        </div>
      ) : (
        <Swiper
          modules={[Autoplay, Navigation]}
          slidesPerView={"auto"}
          onSwiper={(swiper) => {
            swiper.navigation.prevEl.classList.add(
              "!text-primary",
              "hover:!text-primary"
            );

            swiper.navigation.nextEl.classList.add(
              "!text-primary",
              "hover:!text-primary"
            );
          }}
          navigation
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          spaceBetween={20}
          loop={cards.length < 4 ? false : true}
          centerInsufficientSlides
          dir="ltr"
          wrapperTag="ul"
          className={t(`
            w-full
            rounded-xl 
            transition-opacity
            duration-500
            ease-in-out
            p-2
            ${isInView ? "opacity-100" : "opacity-0"}`)}
        >
          {cards.map(({ customIdAr, customIdEn, images }, i) => (
            <SwiperSlide
              className={trim(`!w-auto !max-h-[98%]`)}
              key={i}
              tag="li"
            >
              <GalleryCard
                tag="div"
                customIdAr={customIdAr}
                customIdEn={customIdEn}
                images={images}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <ButtonStyled
        size="custom"
        title={t("designs.galleryBtn")}
        href={appRoutes.designs}
        className="!text-gray-500 hover:!text-primary m-auto w-fit"
      />
    </SectionContainer>
  );
};

export default Designs;
