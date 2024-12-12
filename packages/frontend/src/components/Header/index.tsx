import { trim } from "../../utils/functions/general";
import DrawerContext from "../../context/drawer.context";
import Nav from "./Nav";
import { useState } from "react";
import useAtTop from "../../hooks/useAtTop";
import useScrollSpy from "../../hooks/useScrollSpy";

const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const { isTop } = useAtTop();
  const { scrollDir } = useScrollSpy();

  return (
    <header
      className={trim(`
        flex
        fixed
        w-full
        transition-all
        duration-300
        box-border
        z-10
        ${isTop ? "bg-background-primary/90" : "bg-background-primary"}
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
