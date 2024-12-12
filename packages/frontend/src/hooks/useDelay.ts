import { Dispatch, SetStateAction, useEffect, useState } from "react";

const useDelay = (setTime: number, initialState: boolean) => {
  const [showComponent, setShowComponent] = useState<boolean>(initialState);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowComponent(() => initialState);
    }, setTime);

    return () => clearTimeout(timeout);
  }, [setTime, initialState]);

  const setDelayedComponent = (
    setState: Dispatch<SetStateAction<boolean>>,
    { value, delay = 300 }: { value?: boolean; delay?: number } = {}
  ) => {
    if (value === undefined) {
      if (showComponent) {
        setShowComponent(() => false);
        setTimeout(() => setState(() => false), delay);
        return;
      }
      setState(() => true);
      return;
    }
    setShowComponent(() => value);
    setTimeout(() => setState(() => value), delay);
  };

  return [showComponent, setDelayedComponent] as const;
};

export default useDelay;
