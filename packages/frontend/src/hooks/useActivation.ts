import { useEffect, useState } from "react";

const useActivation = (
  arrayLength: number,
  speedDuration: number,
  options?: {
    delay?: number;
    initializtion?: boolean;
  }
) => {
  const { initializtion = true, delay = 0 } = options || {};

  const [initialite, setInitialite] = useState<boolean>(initializtion);
  const [activationArr, setActivationArr] = useState(() =>
    Array.from({ length: arrayLength }, (_, index) => ({
      active: false,
      index,
    }))
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setInitialite(initializtion);
    }, delay);

    if (!initialite) return;

    const timeouts: NodeJS.Timeout[] = [];

    for (let i = 0; i < arrayLength; i++) {
      const timeout = setTimeout(() => {
        setActivationArr((prev) =>
          prev.map(({ active, index }) => {
            if (index === i) return { ...{ active, index }, active: true };

            return { active, index };
          })
        );
      }, i * speedDuration);
      timeouts.push(timeout);
    }

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(timeout);
    };
  }, [speedDuration, arrayLength, initialite, initializtion, delay]);

  return { activationArr };
};

export default useActivation;
