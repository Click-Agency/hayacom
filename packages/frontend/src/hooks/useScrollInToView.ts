import { LegacyRef, useEffect, useRef, useState } from "react";

const useScrollInToView = (options?: {
  ref?: LegacyRef<HTMLDivElement>;
  threshold?: number;
  addClasses?: string[];
  removeClasses?: string[];
}) => {
  const { addClasses, removeClasses, ref } = options || {};

  const internalRef = useRef(null);
  const targetRef = ref || internalRef;
  const [isInView, setIsInView] = useState<boolean>(false);

  useEffect(() => {
    const threshold =
      window.innerWidth <= 767 ? 0.1 : options?.threshold || 0.4;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(() => true);

            if (addClasses) {
              entry.target.classList.add(...addClasses);
            }

            if (removeClasses) {
              entry.target.classList.remove(...removeClasses);
            }
          }
        });
      },
      { threshold }
    );

    const currentTargetRef = (targetRef as React.RefObject<HTMLElement>)
      .current;

    if (currentTargetRef) observer.observe(currentTargetRef);

    return () => {
      if (currentTargetRef) observer.unobserve(currentTargetRef);
    };
  }, [addClasses, removeClasses, options?.threshold, targetRef]);

  return { targetRef, isInView };
};

export default useScrollInToView;
