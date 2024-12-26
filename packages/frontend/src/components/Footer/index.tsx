import { useTranslation } from "react-i18next";
import { addAttributesToReactNode, trim } from "../../utils/functions/general";
import { Link } from "react-router-dom";
import useScrollInToView from "../../hooks/useScrollInToView";
import useActivation from "../../hooks/useActivation";
import {
  FaInstagram,
  FaXTwitter,
  FaSnapchat,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa6";

const Footer = () => {
  const { t } = useTranslation(["footer", "header", "common"]);

  const { targetRef, isInView } = useScrollInToView();

  const socialIcons = [
    {
      Svg: <FaInstagram size={35} />,
      link: "",
    },
    {
      Svg: <FaXTwitter size={35} />,
      link: "",
    },
    {
      Svg: <FaSnapchat size={35} />,
      link: "",
    },
    {
      Svg: <FaTiktok size={35} />,
      link: "",
    },
    {
      Svg: <FaWhatsapp size={35} />,
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
        bg-primary 
        gap-4
        py-7
        transition-opacity
        ease-in-out
        duration-500
        ${isInView ? "opacity-100" : "opacity-0"}`)}
    >
      <ul
        className={trim(`
          flex
          items-center
          justify-center
          gap-4
          flex-wrap`)}
      >
        {socialIcons.map(({ link, Svg }, i) => (
          <li key={i}>
            <Link to={link}>
              {addAttributesToReactNode(Svg, {
                className: trim(`
                  w-full
                  max-w-12
                  transition-all
                  duration-300
                  ease-in-out
                  hover:scale-110 
                  active:scale-90
                  rounded-full
                  fill-secondary
                  ${activationArr[i].active ? "opacity-100" : "opacity-"}`),
              })}
            </Link>
          </li>
        ))}
      </ul>

      <small
        className={trim(`
          text-center 
          text-responsive-xs 
          font-medium
          text-secondary`)}
      >
        &copy; {new Date().getFullYear()} {t("copyRights")}{" "}
        {t("coName", { ns: "common" })}
      </small>
    </footer>
  );
};

export default Footer;
