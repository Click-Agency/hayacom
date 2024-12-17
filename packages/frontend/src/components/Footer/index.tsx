import { useTranslation } from "react-i18next";
import { trim } from "../../utils/functions/general";
import Logo from "../shared/Logo";
import { Link } from "react-router-dom";
import useScrollInToView from "../../hooks/useScrollInToView";
import useActivation from "../../hooks/useActivation";
import instaIcon from "../../assets/svgs/inta-icon.svg";
import xIcon from "../../assets/svgs/x-icon.svg";
import snapIcon from "../../assets/svgs/snap-icon.svg";
import tiktokIcon from "../../assets/svgs/tiktok-icon.svg";
import whatsIcon from "../../assets/svgs/whats-icon.svg";

const Footer = () => {
  const { t } = useTranslation(["footer", "header", "common"]);

  const { targetRef, isInView } = useScrollInToView();

  const socialIcons = [
    {
      svg: instaIcon,
      link: "",
    },
    {
      svg: xIcon,
      link: "",
    },
    {
      svg: snapIcon,
      link: "",
    },
    {
      svg: tiktokIcon,
      link: "",
    },
    {
      svg: whatsIcon,
      link: "",
    },
  ];

  const { activationArr } = useActivation(socialIcons.length, 300, {
    initializtion: isInView,
  });

  // const onClickHandler = (link: string) => {
  //   if (pathname !== link) push(link);
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // };

  return (
    <footer
      ref={targetRef}
      className={trim(`
        flex 
        flex-col 
        justify-center 
        items-center 
        pb-2 
        bg-background-primary 
        gap-4
        py-7
        transition-opacity
        ease-in-out
        duration-500
        ${isInView ? "opacity-100" : "opacity-0"}`)}
    >
      <Logo className="w-60 md:w-72 max-w-[80px]" />
      <ul
        className={trim(`
          flex
          items-center
          justify-center
          gap-4
          flex-wrap`)}
      >
        {socialIcons.map(({ link, svg }, i) => (
          <li key={i}>
            <Link to={link}>
              <img
                src={svg}
                className={trim(`
                  w-full
                  max-w-12
                  transition-all
                  duration-300
                  ease-in-out
                  hover:scale-110 
                  active:scale-90
                  rounded-full
                  ${activationArr[i].active ? "opacity-100" : "opacity-"}`)}
              />
            </Link>
          </li>
        ))}
      </ul>

      <p className="font-semibold text-primary text-responsive-2md">
        {t("visit", { ns: "footer" })}
      </p>

      <small
        className={trim(`
          text-primary 
          text-center 
          text-responsive-xs 
          font-medium`)}
      >
        &copy; {new Date().getFullYear()} {t("copyRights")}{" "}
        {t("coName", { ns: "common" })}
      </small>
    </footer>
  );
};

export default Footer;
