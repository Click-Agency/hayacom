import { trim } from "../../utils/functions/general";
import DrawerContext from "../../context/drawer.context";
import Nav from "./Nav";
import { useState } from "react";
import useAtTop from "../../hooks/useAtTop";
import useScrollSpy from "../../hooks/useScrollSpy";
import { isRouteFound } from "../../utils/functions/general";
import { useLocation } from "react-router-dom";
import { appRoutes } from "../../config";

const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const { isTop } = useAtTop();
  const { scrollDir } = useScrollSpy();
  const { pathname } = useLocation();

  return (
    <header
      className={trim(`
        fixed
        w-full
        transition-all
        duration-300
        box-border
        z-10
        ${
          isRouteFound(pathname, {
            dynamicRoutes: [appRoutes.auth.path],
          })
            ? "hidden"
            : "flex"
        }
        ${isTop ? "bg-transparent" : "bg-secondary/95"}
        ${scrollDir === "down" ? "-translate-y-full" : "translate-y-0"}
        ${isTop ? "shadow-none" : "shadow-headerShadow"}`)}
    >
      <DrawerContext.Provider value={{ openDrawer, setOpenDrawer }}>
        <Nav />
      </DrawerContext.Provider>
    </header>
  );
};

export default Header;
