import { Dispatch, HTMLAttributes, SetStateAction } from "react";
import { trim } from "../../../utils/functions/general";
import { useTranslation } from "react-i18next";
import useScrollInToView from "../../../hooks/useScrollInToView";

const GalleryCard = ({
  images,
  customIdAr,
  customIdEn,
  setOpenGallery,
  ...attributes
}: {
  images: string[];
  customIdAr: string;
  customIdEn: string;
  setOpenGallery: Dispatch<SetStateAction<boolean>>;
} & HTMLAttributes<HTMLLIElement>) => {
  const { i18n } = useTranslation();
  const { targetRef, isInView } = useScrollInToView();

  const langAr = i18n.language === "ar";

  return (
    <li
      ref={targetRef}
      className={trim(`
        flex
        flex-col
        items-center
        justify-center
        gap-2
        transition-opacity
        duration-500
        ease-in-out
        w-full
        max-w-xs
        ${isInView ? "opacity-100" : "opacity-0"}`)}
      {...attributes}
    >
      <img
        src={images[0]}
        alt="gallery"
        className={trim(`
          cursor-pointer 
          hover:scale-105 
          transform 
          drop-shadow-lg
          transition-transform`)}
        onClick={() => setOpenGallery(() => true)}
      />
      <h2
        className={trim(`
          text-primary 
          font-semibold
          text-responsive-sm
          transition-[opacity,transform]
          duration-500
          ease-in-out
          delay-500
          ${isInView ? "opacity-100" : "opacity-0"}
          ${isInView ? "translate-y-0" : "translate-y-5"}`)}
      >
        {langAr ? customIdAr : customIdEn}
      </h2>
    </li>
  );
};

export default GalleryCard;
