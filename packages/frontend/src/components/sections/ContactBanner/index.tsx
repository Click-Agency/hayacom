import { useTranslation } from "react-i18next";
import SectionContainer from "../../shared/containers/SectionContainer";
import { trim } from "../../../utils/functions/general";
import useScrollInToView from "../../../hooks/useScrollInToView";
import handPhone from "../../../assets/imgs/hand-phone.png";
import ButtonStyled from "../../shared/ButtonStyled";
import info from "../../../config/info";

// const storesArr = [
//   {
//     img: appStoreImg,
//     alt: "app-store",
//     link: "/",
//   },
//   {
//     img: playStoreImg,
//     alt: "play-store",
//     link: "/",
//   },
// ];

const ContactBanner = () => {
  const { t } = useTranslation(["home"]);

  const { isInView, targetRef } = useScrollInToView();

  return (
    <SectionContainer
      className="bg-sheet-paper !p-0"
      ref={targetRef}
      id="download-app"
      dir="rtl"
      wraperClassName={`
        md:flex-row 
        items-center 
        justify-between 
        gap-4
        transition-all
        duration-500
        ease-in-out
        !p-0
        !w-full
        ${isInView ? "opacity-100" : "opacity-0"}`}
    >
      <img
        src={handPhone}
        alt="app"
        className={trim(`
          flex-1
          w-full
          md:max-w-[35%]
          max-w-[230px]
          drop-shadow-2xl
          shadow-primary`)}
      />

      <div
        className={trim(`
          flex-1
          flex
          flex-col
          gap-8
          md:ml-[15%]
          justify-center
          items-center
          text-center
          md:max-w-[40%]`)}
      >
        <h1
          className={trim(`
            text-primary
            text-responsive-2xl
            font-semibold
            text-shadow-lg`)}
        >
          {t("contactBanner.title")}
        </h1>

        <div
          className={trim(`
            flex 
            gap-2 
            items-center
            justify-center
            w-full
            flex-wrap`)}
        >
          {/* {storesArr.map(({ img, alt, link }, i) => (
            <Link key={i} to={link} target="_blank">
              <img
                src={img}
                alt={alt}
                className={trim(`
                  block
                  w-full
                  max-w-36
                  md:max-w-48
                  rounded-xl
                  border-2
                  border-gray-500
                  transition-all
                  duration-300
                  ease-in-out
                  hover:scale-105
                  active:scale-95`)}
              />
            </Link>
          ))} */}
          <ButtonStyled
            className={`
              rounded-full
              hover:!scale-105 
              active:!scale-95 
              animate-appear
              md:w-[70%]
              lg:w-[50%]
              w-full
              max-w-[200px]
              md:max-w-none
              md:mb-0
              mb-4`}
            ripple
            href={`tel:${info.contact.phone}`}
            bg
            title={t("contactUs", { ns: "common" })}
          />
        </div>
      </div>
    </SectionContainer>
  );
};

export default ContactBanner;
