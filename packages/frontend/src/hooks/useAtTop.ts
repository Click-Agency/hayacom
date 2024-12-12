import { useEffect, useState } from "react";

const useAtTop = () => {
  const [isTop, setIsTop] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (window.scrollY > 50) setIsTop(false);

    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        setIsTop(() => false);
      } else {
        setIsTop(() => true);
      }
    });

    setIsLoaded(() => true);
  }, []);

  return { isTop, isLoaded };
};

export default useAtTop;
