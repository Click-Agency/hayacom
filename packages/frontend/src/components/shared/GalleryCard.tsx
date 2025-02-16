import { Dispatch, HTMLAttributes, SetStateAction } from "react";
import { trim } from "../../utils/functions/general";
import { useTranslation } from "react-i18next";
import useScrollInToView from "../../hooks/useScrollInToView";
import { LuEye } from "react-icons/lu";

const GalleryCard = ({
  images,
  customIdAr,
  customIdEn,
  setOpenGallery,
  tag: Tag = "li",
  ...attributes
}: {
  images: string[];
  customIdAr: string;
  customIdEn: string;
  setOpenGallery?: Dispatch<SetStateAction<boolean>>;
  tag?: "li" | "div";
} & HTMLAttributes<HTMLLIElement | HTMLDivElement>) => {
  const { i18n } = useTranslation();
  const { targetRef, isInView } = useScrollInToView();

  const langAr = i18n.language === "ar";

  return (
    <Tag
      ref={targetRef}
      className={trim(`
        flex
        flex-col
        justify-center
        gap-2
        px-8
        pt-10
        pb-6
        bg-white
        rounded-xl
        shadow-xl
        transition-opacity
        duration-500
        ease-in-out
        w-full
        md:min-w-[300px]
        max-w-sm
        h-full
        box-border
        group
        md:min-h-[550px]
        ${setOpenGallery ? "cursor-pointer" : ""}
        ${isInView ? "opacity-100" : "opacity-0"}`)}
      {...attributes}
    >
      <div className="overflow-hidden rounded-lg h-full">
        <img
          src={images[0]}
          alt="gallery"
          className={trim(`
            block
            transform 
            rounded-lg
            transition-transform
            h-full
            ${setOpenGallery ? "group-hover:scale-105" : ""}`)}
          onClick={() => setOpenGallery && setOpenGallery(() => true)}
        />
      </div>
      <div
        className={trim(`
          flex
          justify-between
          items-center
          text-primary
          text-responsive-2sm
          transition-[opacity,transform]
          duration-500
          ease-in-out
          delay-500
          font-semibold
          ${isInView ? "opacity-100" : "opacity-0"}`)}
      >
        <h2>{langAr ? customIdAr : customIdEn}</h2>

        {setOpenGallery && <LuEye />}
      </div>
    </Tag>
  );
};

export default GalleryCard;
