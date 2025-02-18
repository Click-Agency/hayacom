import { useTranslation } from "react-i18next";
import { trim } from "../../../utils/functions/general";
import SectionContainer from "../../shared/containers/SectionContainer";
import SectionHeader from "../../shared/SectionHeader";
import { useEffect, useState } from "react";
import useRemoveScroll from "../../../hooks/useRemoveScroll";
import { getCards } from "../../../api/routes/cards";
import { Card } from "../../../types/cards";
import { PaginateMeta } from "../../../types/response";
import Loader from "../../shared/Loader";
import Lightbox from "yet-another-react-lightbox";
import { Captions, Thumbnails, Zoom } from "yet-another-react-lightbox/plugins";
import GalleryCard from "../../shared/GalleryCard";
import Pagination from "../../shared/Pagination";

const CardsGallery = () => {
  const { t, i18n } = useTranslation(["designs"]);
  const [qurey, setQurey] = useState({ page: 1, limit: 10 });
  const [resposeCards, setResposeCards] = useState<{
    data: Card[];
    meta: PaginateMeta;
  }>();
  const [noCards, setNoCards] = useState(false);
  const [openGallery, setOpenGellery] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  useRemoveScroll(openGallery);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setResposeCards(() => undefined);
        const res = await getCards(qurey);

        if (!res.data) {
          setNoCards(() => true);
          return;
        }

        setResposeCards(res.data);
      } catch (err) {
        setNoCards(() => true);
      }
    };
    fetchCards();
  }, [qurey]);

  const targetGallery = (i: number) => {
    setGalleryIndex(() => i);
    setOpenGellery(() => true);
  };

  return (
    <SectionContainer
      id="cards-gallery"
      className={`mt-5`}
      wraperClassName="items-center mt-15 md:mt-28"
    >
      <SectionHeader
        className="max-w-xl self-start"
        title={t("gallery.title")}
      />

      {!resposeCards?.data.length && !noCards ? (
        <Loader className="min-h-[900px]" />
      ) : noCards ? (
        <div>
          <h2
            className={trim(`
              text-center 
              text-responsive-md 
              font-semibold
              text-primary mt-2`)}
          >
            {t("gallery.noCards")}
          </h2>
        </div>
      ) : (
        <ul
          className={trim(`
            grid
            grid-cols-1
            gap-8
            md:grid-cols-2
            lg:grid-cols-3
            mt-5
            transition-all
            duration-500
            ease-in-out`)}
        >
          {resposeCards?.data.map((card, i) => (
            <GalleryCard
              key={i}
              setOpenGallery={setOpenGellery}
              customIdAr={card.customIdAr}
              customIdEn={card.customIdEn}
              images={card.images}
              onClick={() => targetGallery(i)}
            />
          ))}
        </ul>
      )}

      {!noCards && resposeCards?.data && (
        <Pagination
          meta={resposeCards?.meta}
          setQuery={setQurey}
          changeDir={i18n.dir() === "rtl"}
        />
      )}

      {resposeCards?.data.length && (
        <Lightbox
          plugins={[Captions, Zoom, Thumbnails]}
          open={openGallery}
          slides={resposeCards?.data[galleryIndex]?.images.map((img) => ({
            src: img,
            title:
              i18n.language === "ar"
                ? resposeCards?.data[galleryIndex]?.customIdAr
                : resposeCards?.data[galleryIndex]?.customIdEn,
          }))}
          close={() => setOpenGellery(() => false)}
        />
      )}
    </SectionContainer>
  );
};

export default CardsGallery;
