import { useTranslation } from "react-i18next";
import SectionContainer from "../../shared/containers/SectionContainer";
import SectionHeader from "../../shared/SectionHeader";
import { useEffect, useState } from "react";
import { getCards } from "../../../api/routes/cards";
import { Card } from "../../../types/cards";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Loader from "../../shared/Loader";
import { trim } from "../../../utils/functions/general";
import useScrollInToView from "../../../hooks/useScrollInToView";

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
    <SectionContainer id={"designs"} ref={targetRef} wraperClassName="gap-4">
      <SectionHeader title={t("designs.title")} />

      {!cards.length && !noCards ? (
        <Loader />
      ) : noCards ? (
        <div>
          <h2
            className={trim(`
                text-center 
                text-responsive-md 
                font-semibold
                text-primary mt-2`)}
          >
            {t("designs.noCards")}
          </h2>
        </div>
      ) : (
        <Swiper
          modules={[Autoplay]}
          slidesPerView={"auto"}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          spaceBetween={20}
          loop={cards.length < 4 ? false : true}
          centerInsufficientSlides
          dir="ltr"
          wrapperTag="ul"
          wrapperClass="p-2"
          className={t(`
            w-full
            rounded-xl 
            transition-opacity
            duration-500
            ease-in-out
            p-2
            ${isInView ? "opacity-100" : "opacity-0"}`)}
        >
          {cards.map(({ image }, i) => (
            <SwiperSlide className="!w-auto shadow-xl" key={i} tag="li">
              <img className={`block !w-auto max-w-[25.6rem]`} src={image} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <SectionHeader title={t("designs.footer")} />
    </SectionContainer>
  );
};

export default Designs;
