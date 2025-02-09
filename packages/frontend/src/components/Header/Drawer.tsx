import { useCallback, useContext } from "react";
import DrawerContext from "../../context/drawer.context";
import useDelay from "../../hooks/useDelay";
import useRemoveScroll from "../../hooks/useRemoveScroll";
import { trim } from "../../utils/functions/general";
import ButtonStyled from "../shared/ButtonStyled";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Session } from "../../types/user";

const tailWindClasses = {
  aside: {
    width: "w-2/3",
    bg: "bg-background-primary",
    darkBg: null,
  },
  backDrop: {
    bg: "bg-black/50",
  },
};

const Drawer = ({
  navArr,
  activePath,
  ChangeLanguageBtn,
  SpecialBtn,
  lang,
  drawerNavFun,
  session,
}: {
  navArr: { name: string; link: string | Function; type: string }[];
  activePath?: string | null;
  ChangeLanguageBtn?: JSX.Element;
  SpecialBtn?: JSX.Element;
  lang: string;
  session?: Session;
  drawerNavFun: (link: string) => void;
}) => {
  const { openDrawer, setOpenDrawer } = useContext(DrawerContext);

  const [showComponent, setShowComponent] = useDelay(10, openDrawer);
  useRemoveScroll(openDrawer);

  const handleClose = useCallback(() => {
    setShowComponent(setOpenDrawer, { value: false, delay: 300 });
  }, [setOpenDrawer, setShowComponent]);

  const onNavHandler = (link: string) => {
    handleClose();
    drawerNavFun(link);
  };

  const { aside, backDrop } = tailWindClasses;

  return (
    <div
      className={trim(`
        fixed
        right-0
        top-0
        w-full
        h-full
        min-w-screen
        min-h-screen
        lg:hidden
        md:hidden
        z-20
        ${openDrawer ? "block" : "hidden"}`)}
    >
      <aside
        className={trim(`
          absolute
          top-0
          flex
          flex-col
          h-full
          duration-300
          ease-linear
          px-8
          py-5
          gap-10
          z-10
          ${aside.width || ""}
          ${aside.bg || ""}
          ${aside.darkBg || ""}
          ${lang === "ar" ? "right-full" : "right-0"}
          ${
            lang === "ar"
              ? showComponent
                ? "translate-x-full"
                : "-translate-x-0"
              : showComponent
                ? "translate-x-0"
                : "translate-x-full"
          }`)}
      >
        <ButtonStyled
          className={trim(`
            !text-primary 
            self-start 
            ${lang === "ar" ? "-scale-x-100" : ""}`)}
          size="xs"
          onClick={handleClose}
          SvgIcon={<MdKeyboardArrowRight size={35} />}
        />

        <ul
          className={trim(`
            flex
            h-full
            w-full
            flex-col
            justify-start
            items-center
            gap-5
            overflow-y-auto`)}
        >
          {navArr.map(({ name, link, type }, i) => {
            if (
              (!session?._id && type === "admin") ||
              (session?._id && type === "userOnly")
            )
              return;

            return (
              <li key={i}>
                <ButtonStyled
                  onClick={() => {
                    if (typeof link === "string") {
                      onNavHandler(link);
                    } else {
                      link();
                    }
                  }}
                  className={trim(`
                  !text-primary
                  font-medium
                  ${
                    activePath === link
                      ? `underline underline-offset-4
                       decoration-body-primary decoration-4`
                      : ""
                  }`)}
                  size="md"
                  title={name}
                  animatedUnderline={activePath !== link}
                />
              </li>
            );
          })}

          {SpecialBtn && <li>{SpecialBtn}</li>}
          {ChangeLanguageBtn && <li>{ChangeLanguageBtn}</li>}
        </ul>
      </aside>
      <div
        className={trim(`
          absolute
          w-full
          min-w-screen
          min-h-screen
          h-full
          ${backDrop.bg || ""}
          ${showComponent ? "opacity-70" : "opacity-0"}`)}
        onClick={handleClose}
      ></div>
    </div>
  );
};

export default Drawer;
