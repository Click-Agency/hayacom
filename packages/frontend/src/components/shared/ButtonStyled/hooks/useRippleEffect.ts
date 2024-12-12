import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import styles from "../button-styles.module.css";

const useRippleEffect = (
  ripple?: boolean,
  options?: { bgColor?: string; duration?: number }
) => {
  const { bgColor = "bg-white", duration = 500 } = options || {};
  const [clicked, setClicked] = useState(false);
  const [event, setEvent] = useState<MouseEvent<HTMLElement>>();

  const targetRef = useRef<HTMLElement | null>(null);

  const createRipple = useCallback(
    (e?: MouseEvent<HTMLElement>) => {
      if (!targetRef.current || !e) return;

      const elem = targetRef.current as HTMLElement;

      if (ripple) {
        const rect = elem.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        const containerElement = document.createElement("div");
        const rippleElement = document.createElement("span");

        rippleElement.style.width = `${size}px`;
        rippleElement.style.height = `${size}px`;
        rippleElement.style.left = `${x}px`;
        rippleElement.style.top = `${y}px`;

        containerElement.classList.add(styles.rippleEffectContainer);
        rippleElement.classList.add(styles.rippleEffect, bgColor);

        containerElement.appendChild(rippleElement);
        elem.appendChild(containerElement);

        const timeout = setTimeout(() => {
          if (containerElement && containerElement.parentNode)
            containerElement?.parentNode?.removeChild(containerElement);
        }, duration);

        return () => clearTimeout(timeout);
      }
    },
    [bgColor, duration, ripple]
  );

  useEffect(() => {
    if (clicked) {
      createRipple(event);
      setClicked(() => false);
    }
  }, [clicked, createRipple, event]);

  const setFire = useCallback((e: MouseEvent<HTMLElement>) => {
    setEvent(() => e);
    setClicked(() => true);
  }, []);

  return [targetRef, setFire] as const;
};

export default useRippleEffect;
