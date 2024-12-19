import { appRoutes } from "../../config";
import ButtonStyled from "../shared/ButtonStyled";
import { changeLanguage } from "i18next";
import { MdMenuOpen } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { trim } from "../../utils/functions/general";
import Drawer from "./Drawer";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import DrawerContext from "../../context/drawer.context";
import Logo from "../shared/Logo";
import useActivation from "../../hooks/useActivation";
import { FaPhone } from "react-icons/fa";
import Profile from "./Profile";
import useSession from "../../hooks/useSession";
import DropdownMenu from "./DropdownMenu";

const Nav = () => {
  const { t, i18n } = useTranslation("header");
  const { pathname } = useLocation();
  const { setOpenDrawer } = useContext(DrawerContext);
  const push = useNavigate();
  const session = useSession();

  const navArr = [
    {
      name: t("nav.home"),
      link: appRoutes.home,
      sections: [
        {
          id: "packages",
          name: t("nav.packages"),
        },
        {
          id: "comparisons",
          name: t("nav.comparisons"),
        },
        {
          id: "testimonials",
          name: t("nav.clients"),
        },
        {
          id: "download-app",
          name: t("nav.download"),
        },
      ],
    },

    {
      name: t("nav.designs"),
      link: appRoutes.designs,
      sections: [
        {
          id: "cards-gallery",
          name: t("nav.gallery"),
        },
        {
          id: "download-app",
          name: t("nav.download"),
        },
      ],
    },
  ];

  const { activationArr } = useActivation(navArr.length, 300);

  const onClickHandler = (link: string) => {
    if (pathname !== link) push(link);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav
      className={trim(`
        flex
        items-center
        justify-between
        lg:justify-around
        gap-3
        py-5
        px-5
        w-full
        md:px-[3%]
        lg:px-[10%]
        xl:px-[15%]`)}
    >
      <Logo
        onClick={() => onClickHandler(appRoutes.home)}
        className="cursor-pointer w-40 md:w-52 max-w-12 md:max-w-[80px]"
      />

      <ul className="flex gap-10">
        {navArr.map(({ name, link, sections }, i) => (
          <li
            className={trim(`
              relative 
              hidden 
              md:inline-flex 
              group`)}
            key={i}
          >
            <ButtonStyled
              onClick={() => onClickHandler(link)}
              className={trim(`
                !text-primary
                font-medium
            ${
              pathname === link
                ? `underline underline-offset-4
                 decoration-body-primary decoration-4`
                : ""
            }
            ${activationArr[i].active ? `opacity-100` : `opacity-0`}`)}
              title={name}
              size="custom"
              animatedUnderline={pathname !== link}
            />

            <DropdownMenu
              className={`
              ${sections.length && pathname === link ? "group-hover:block" : ""}
                hidden`}
              sections={sections}
            />
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3 md:gap-7">
        <ButtonStyled
          className={trim(`
            rounded-full
            hover:!scale-105 
            active:!scale-95 
            !hidden 
            md:!inline-flex 
            animate-appear`)}
          ripple
          href="tel:1234567890"
          bg
          size="sm"
          title={t("nav.contact")}
          SvgIcon={<FaPhone color="#FFEEE1" size={15} />}
        />

        <ButtonStyled
          className={trim(`
            !text-primary 
            !hidden
            md:!inline-flex
            text-responsive-2xs 
            hover:!text-body-primary
            animate-appear`)}
          size="custom"
          title={t("nav.lang")}
          onClick={() => {
            changeLanguage(i18n.dir() === "ltr" ? "ar" : "en");
          }}
        />

        <div className={`${session?._id ? "inline-flex" : "hidden"}`}>
          <Profile session={session} />
        </div>

        <ButtonStyled
          className={`${i18n.dir() === "rtl" ? "-scale-x-100" : ""} md:!hidden !inline-flex`}
          size="custom"
          onClick={() => setOpenDrawer((prev) => !prev)}
          SvgIcon={<MdMenuOpen color="#730F20" size={30} />}
        />
      </div>

      <Drawer
        drawerNavFun={onClickHandler}
        activePath={pathname}
        lang={i18n.language}
        navArr={navArr}
        SpecialBtn={
          <ButtonStyled
            ripple
            className="rounded-full"
            href="tel:1234567890"
            bg
            size="sm"
            title={t("nav.contact")}
            onClick={() => setOpenDrawer(() => false)}
            SvgIcon={<FaPhone color="#FFEEE1" size={15} />}
          />
        }
        ChangeLanguageBtn={
          <ButtonStyled
            className={trim(`
              !text-primary 
              text-responsive-2xs 
              hover:!text-body-primary`)}
            size="custom"
            title={t("nav.lang")}
            onClick={() => {
              changeLanguage(i18n.language === "en" ? "ar" : "en");
              setOpenDrawer(() => false);
            }}
          />
        }
      />
    </nav>
  );
};

export default Nav;
