import { trim } from "../../utils/functions/general";
import DrawerContext from "../../context/drawer.context";
import Nav from "./Nav";
import { useState } from "react";
import { isRouteFound } from "../../utils/functions/general";
import { useLocation } from "react-router-dom";
import { appRoutes } from "../../config";

const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const { pathname } = useLocation();

  return (
    <header
      className={trim(`
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
        }`)}
    >
      <DrawerContext.Provider value={{ openDrawer, setOpenDrawer }}>
        <Nav />
      </DrawerContext.Provider>
    </header>
  );
};

export default Header;
