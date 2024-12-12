import { SetStateAction, Dispatch, createContext } from "react";

const DrawerContext = createContext({
  openDrawer: false,
  setOpenDrawer: (() => {}) as Dispatch<SetStateAction<boolean>>,
});

export default DrawerContext;
