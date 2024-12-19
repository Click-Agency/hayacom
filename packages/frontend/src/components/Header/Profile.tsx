import useDelay from "../../hooks/useDelay";
import { trim } from "../../utils/functions/general";
import { useCallback, useEffect, useState } from "react";
import ButtonStyled from "../shared/ButtonStyled";
import { appRoutes } from "../../config";
import { MdAdminPanelSettings } from "react-icons/md";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { GoProjectSymlink } from "react-icons/go";
import { ClipLoader } from "react-spinners";
import useOutsideClick from "../../hooks/useOutsideClick";
import useScrollSpy from "../../hooks/useScrollSpy";
import { revokeRefreshToken } from "../../api/routes/auth";
import { Session } from "../../types/user";
import { useLocation, useNavigate } from "react-router-dom";
import useStorage from "../../hooks/useStorage";
import hayakomImg from "../../assets/imgs/icon-hayakom.png";
import { useTranslation } from "react-i18next";

const Profile = ({ session }: { session: Session | null }) => {
  const [showActions, setShowActions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { scrollDir } = useScrollSpy();
  const [showComponent, setShowComponent] = useDelay(10, showActions);
  const { pathname } = useLocation();
  const push = useNavigate();
  const { removeItem } = useStorage("_hayakomSession");
  const { t, i18n } = useTranslation(["header"]);

  const profileRoutes = [
    {
      name: t("admin.control"),
      link: appRoutes.admin,
      Icon: <MdAdminPanelSettings />,
      type: "route",
    },
    {
      name: t("admin.crPackage"),
      link: appRoutes.createPacakge,
      Icon: <GoProjectSymlink />,
      type: "route",
    },
    {
      name: t("admin.crCard"),
      link: appRoutes.createCard,
      Icon: <GoProjectSymlink />,
      type: "route",
    },
    {
      name: t("admin.logout"),
      link: appRoutes.home,
      Icon: <RiLogoutCircleRLine />,
      type: "logout",
    },
  ];

  const onCloseActions = useCallback(() => {
    setShowComponent(setShowActions, { value: false, delay: 300 });
  }, [setShowComponent]);

  const ulRef = useOutsideClick(() => showActions && onCloseActions());

  useEffect(() => {
    scrollDir === "down" && showActions && onCloseActions();
  }, [scrollDir, onCloseActions, showActions]);

  if (!session) return null;

  const onClickHandler = (link: string) => {
    if (pathname !== link) {
      push(link);
      onCloseActions();
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    onCloseActions();
    return;
  };

  const onLogOutHandler = async () => {
    try {
      setIsLoading(() => true);
      console.log("Logging out...");
      await revokeRefreshToken();
      removeItem();
      onCloseActions();
      window.location.reload();
      push(appRoutes.home);
      setIsLoading(() => false);
    } catch (err) {
      setIsLoading(() => false);
    }
  };

  return (
    <div id={"profile"} className="relative animate-appear">
      <img
        className={trim(`
          rounded-full
          cursor-pointer
          transition-all
          duration-300
          ease-in-out
          ${showActions ? `ring-2 ring-primary` : ``}`)}
        src={hayakomImg}
        alt="pfp"
        width={45}
        height={45}
        onClick={() => setShowComponent(setShowActions, { delay: 300 })}
      />
      <div className={showActions ? "block" : "hidden"}>
        <ul
          ref={ulRef}
          className={trim(`
            absolute
            flex
            flex-col
            top-15
            ${i18n.dir() === "ltr" ? "right-0" : "left-0"}
            min-w-40
            transition-[opacity]
            duration-300
            ease-in-out
            bg-background-secondary/90
            border
            backdrop-blur-md
            rounded-lg
            overflow-hidden
            shadow-lg
            z-[1]
            ${showComponent ? "opacity-100" : "opacity-0"}`)}
        >
          {profileRoutes.map(({ name, link, Icon, type }, i) => (
            <li key={i} className="w-full">
              <ButtonStyled
                hover
                ripple
                className={trim(`
                  w-full 
                  !pl-2 
                  !justify-start 
                  hover:bg-box-light
                  text-nowrap`)}
                disabled={isLoading}
                title={name}
                IconRight
                SvgIcon={
                  name === "logout" ? (
                    isLoading ? (
                      <ClipLoader size={20} color="text-primary" />
                    ) : (
                      Icon
                    )
                  ) : (
                    Icon
                  )
                }
                onClick={() =>
                  type === "logout" ? onLogOutHandler() : onClickHandler(link)
                }
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
