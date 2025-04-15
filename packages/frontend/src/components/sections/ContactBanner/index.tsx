import { useTranslation } from "react-i18next";
import SectionContainer from "../../shared/containers/SectionContainer";
import { trim } from "../../../utils/functions/general";
import useScrollInToView from "../../../hooks/useScrollInToView";
import ButtonStyled from "../../shared/ButtonStyled";
import info from "../../../config/info";
import Logo from "../../shared/Logo";

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
      className="bg-sheet-paper"
      ref={targetRef}
      id="download-app"
      dir="rtl"
      wraperClassName={`
        md:flex-row 
        items-center 
        justify-around 
        gap-10
        md:gap-4
        transition-all
        duration-500
        ease-in-out
        py-10
        ${isInView ? "opacity-100" : "opacity-0"}`}
    >
      {/* <img
        src={handPhone}
        alt="app"
        className={trim(`
          flex-1
          w-full
          md:max-w-[35%]
          max-w-[230px]
          drop-shadow-2xl
          shadow-primary`)}
      /> */}
      <Logo className="max-w-32 md:max-w-64" />

      <div
        className={trim(`
          flex
          flex-col
          gap-9
          justify-center
          items-center
          text-center
          md:max-w-[40%]`)}
      >
        <h1
          className={trim(`
            text-primary
            text-responsive-lg
            md:text-responsive-xl
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
              max-w-full
              md:max-w-none
              md:mb-0
              mb-4`}
            ripple
            href={info.socials.whatsapp}
            target="_blank"
            bg
            title={t("contactUs", { ns: "common" })}
          />
        </div>
      </div>
    </SectionContainer>
  );
};

export default ContactBanner;
