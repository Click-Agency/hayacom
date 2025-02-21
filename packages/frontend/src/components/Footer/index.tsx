import {
  addAttributesToReactNode,
  isRouteFound,
  trim,
} from "../../utils/functions/general";
import { Link, useLocation } from "react-router-dom";
import useScrollInToView from "../../hooks/useScrollInToView";
import useActivation from "../../hooks/useActivation";
import { FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa6";
import Logo from "../shared/Logo";
import { FaSnapchatGhost } from "react-icons/fa";
import { appRoutes } from "../../config";
import info from "../../config/info";

const Footer = () => {
  // const { t } = useTranslation(["footer", "header", "common"]);

  const { targetRef, isInView } = useScrollInToView();
  const { pathname } = useLocation();

  const socialIcons = [
    {
      Svg: <FaInstagram size={35} />,
      link: info.socials.instagram,
    },
    // {
    //   Svg: <FaXTwitter size={35} />,
    //   link: "",
    // },
    {
      Svg: <FaTiktok size={35} />,
      link: "",
    },
    {
      Svg: <FaWhatsapp size={35} />,
      link: info.socials.whatsapp,
    },
    {
      Svg: <FaSnapchatGhost size={35} />,
      link: info.socials.snapchat,
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
        bg-gradient-background-light
        border-t
        border-primary
        gap-8
        pt-8
        pb-14
        transition-opacity
        ease-in-out
        duration-500
        ${
          isRouteFound(pathname, {
            dynamicRoutes: [appRoutes.auth.path],
            includes: [appRoutes.admin],
          })
            ? "hidden"
            : "flex"
        }
        ${isInView ? "opacity-100" : "opacity-0"}`)}
    >
      <Logo className="max-w-16" />
      <ul
        className={trim(`
          flex
          items-center
          justify-center
          gap-4
          flex-wrap
          text-primary`)}
      >
        {socialIcons.map(({ link, Svg }, i) => (
          <li key={i}>
            <Link to={link}>
              {addAttributesToReactNode(Svg, {
                className: trim(`
                  w-full
                  border-2
                  p-1
                  w-8
                  h-8
                  border-primary
                  rounded-full
                  transition-all
                  duration-300
                  ease-in-out
                  hover:scale-110 
                  active:scale-90
                  rounded-full
                  fill-primary
                  ${activationArr[i].active ? "opacity-100" : "opacity-"}`),
              })}
            </Link>
          </li>
        ))}
      </ul>

      {/* <small
        className={trim(`
          text-center 
          text-responsive-xs 
          font-medium
          text-secondary`)}
      >
        &copy; {new Date().getFullYear()} {t("copyRights")}{" "}
        {t("coName", { ns: "common" })}
      </small> */}
    </footer>
  );
};

export default Footer;
