import { useEffect } from "react";

const useRemoveScroll = (triger: boolean) => {
  useEffect(() => {
    if (triger) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [triger]);
};

export default useRemoveScroll;
