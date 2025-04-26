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
import Profile from "./Profile";
import useSession from "../../hooks/useSession";
import { TbPackages, TbGitCompare } from "react-icons/tb";
import { GiCardJoker } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import { GrGallery } from "react-icons/gr";
import info from "../../config/info";

const Nav = () => {
  const { t, i18n } = useTranslation("header");
  const { pathname } = useLocation();
  const { setOpenDrawer } = useContext(DrawerContext);
  const push = useNavigate();
  const session = useSession();

  const handleSectionClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);

    if (element) element.scrollIntoView({ behavior: "smooth" });
    else {
      push(appRoutes.home);

      setTimeout(() => {
        const elementReFetch = document.getElementById(sectionId);
        elementReFetch?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const navArr = [
    {
      name: t("nav.home"),
      link: appRoutes.home,
      type: "user",
      sections: [
        {
          id: "packages",
          name: t("nav.packages"),
          icon: <TbPackages />,
        },
        {
          id: "comparisons",
          name: t("nav.comparisons"),
          icon: <TbGitCompare />,
        },
        {
          id: "designs",
          name: t("nav.ourDesigns"),
          icon: <GiCardJoker />,
        },
        {
          id: "testimonials",
          name: t("nav.clients"),
          icon: <FaUsers />,
        },
        // {
        //   id: "download-app",
        //   name: t("nav.download"),
        //   icon: <RiMobileDownloadFill />,
        // },
      ],
    },

    {
      name: t("nav.packages"),
      link: () => handleSectionClick("packages"),
      type: "userOnly",
      sections: [],
    },

    {
      name: t("nav.designs"),
      link: appRoutes.designs,
      type: "user",
      sections: [
        {
          id: "cards-gallery",
          name: t("nav.gallery"),
          icon: <GrGallery />,
        },
        // {
        //   id: "download-app",
        //   name: t("nav.download"),
        //   icon: <RiMobileDownloadFill />,
        // },
      ],
    },

    {
      name: t("admin.crPackage"),
      link: appRoutes.createPacakge,
      type: "admin",
      sessions: [],
    },
    {
      name: t("admin.crCard"),
      link: appRoutes.createCard,
      type: "admin",
      session: [],
    },

    {
      name: t("admin.control"),
      link: appRoutes.admin,
      type: "admin",
      sections: [],
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
        md:px-[2%]
        lg:px-[4%]
        xl:px-[5%]
        gap-3
        py-5
        px-5
        w-full`)}
    >
      <div className="flex flex-1 items-center gap-3 md:hidden">
        <ButtonStyled
          className={`
            !text-gray-500
            hover:!text-body-primary
            ${i18n.dir() === "ltr" ? "-scale-x-100" : ""} md:!hidden 
            ${!session?._id ? "!md:!inline-flex" : ""}`}
          size="custom"
          onClick={() => setOpenDrawer((prev) => !prev)}
          SvgIcon={<MdMenuOpen size={30} />}
        />

        <hr className="h-6 w-0.5 bg-gray-500 md:hidden" />

        <ButtonStyled
          className={trim(`
            !text-gray-500
            md:!hidden
            text-responsive-2xs
            active:!text-body-primary
            animate-appear`)}
          size="custom"
          title={t("nav.lang")}
          onClick={() => {
            changeLanguage(i18n.language === "en" ? "ar" : "en");
            setOpenDrawer(() => false);
          }}
        />

        <hr
          className={trim(`
            h-6
            w-0.5
            bg-gray-500
            ${session?._id ? "inline-flex md:hidden" : "hidden"}`)}
        />

        <Profile
          session={session}
          className={`${session?._id ? "inline-flex md:hidden" : "hidden"}`}
        />
      </div>

      <Profile
        session={session}
        className={`${session?._id ? "md:inline-flex hidden" : "hidden"}`}
      />

      <ul className="hidden md:flex lg:gap-7 gap-5 flex-1">
        {session?._id && <hr className="h-6 w-0.5 bg-gray-500" />}
        <ButtonStyled
          className={trim(`
            !text-gray-500
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

        <hr className="h-6 w-0.5 bg-gray-500" />

        {navArr
          .map(({ name, link, type }, i) => {
            if (
              (!session?._id && type === "admin") ||
              (session?._id && type === "userOnly")
            )
              return;

            return (
              <li
                className={trim(`
                  relative 
                  hidden 
                  md:inline-flex 
                  group`)}
                key={i}
              >
                <ButtonStyled
                  onClick={() => {
                    if (typeof link === "string") {
                      onClickHandler(link);
                    } else {
                      link();
                    }
                  }}
                  className={trim(`
                    ${
                      pathname === link
                        ? `
                          underline underline-offset-4
                          !text-[#730f20]
                          decoration-body-primary 
                          decoration-4`
                        : `
                          !text-gray-500 
                          hover:!text-body-primary`
                    }
                    ${activationArr[i].active ? `opacity-100` : `opacity-0`}`)}
                  title={name}
                  size="custom"
                  animatedUnderline={pathname !== link}
                />

                {/* <DropdownMenu
                className={`
              ${sections.length && pathname === link ? "group-hover:block" : ""}
                hidden`}
                sections={sections}
              /> */}
              </li>
            );
          })
          .reverse()}
      </ul>

      <Logo
        onClick={() => onClickHandler(appRoutes.home)}
        className={`
          cursor-pointer
          w-40
          md:w-52
          max-w-16
          md:max-w-[80px]
          block
          ${!session?._id ? "flex-1" : "flex-1"}`}
      />

      <div
        className={`justify-end flex-1 ${!session?._id ? "flex" : "hidden"}`}
      >
        <ButtonStyled
          className={`
            rounded-full
            hover:!scale-105 
            active:!scale-95
            animate-appear
            px-4
            py-1.5
            md:px-9
            md:py-2
            text-responsive-3xs
            md:text-responsive-xs`}
          ripple
          href={info.socials.whatsappSales}
          target="_blank"
          bg
          size="custom"
          title={t("nav.contact")}
        />
      </div>

      <Drawer
        drawerNavFun={onClickHandler}
        activePath={pathname}
        lang={i18n.language}
        navArr={navArr}
        session={session}
        // SpecialBtn={
        //   <ButtonStyled
        //     ripple
        //     className={`
        //       rounded-full
        //       ${session?._id ? "!hidden" : ""}`}
        //     href="tel:1234567890"
        //     bg
        //     size="sm"
        //     title={t("nav.contact")}
        //     onClick={() => setOpenDrawer(() => false)}
        //     SvgIcon={<FaPhone color="#FFEEE1" size={15} />}
        //   />
        // }
        // ChangeLanguageBtn={
        //   <ButtonStyled
        //     className={trim(`
        //       !text-white
        //       text-responsive-2xs
        //       hover:!text-body-primary`)}
        //     size="custom"
        //     title={t("nav.lang")}
        //     onClick={() => {
        //       changeLanguage(i18n.language === "en" ? "ar" : "en");
        //       setOpenDrawer(() => false);
        //     }}
        //   />
        // }
      />
    </nav>
  );
};

export default Nav;
