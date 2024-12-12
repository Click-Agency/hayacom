import { ForwardedRef, MutableRefObject, useRef } from "react";

const useRefForward = <T>(
  ref: ForwardedRef<T>,
  options?: {
    customRef?: MutableRefObject<T | null>;
  }
) => {
  const defaultRef = useRef<T | null>(null);
  const targetRef = options?.customRef ?? defaultRef;

  const refHandler = (e: T | null) => {
    if (typeof ref === "function") ref(e);
    if (ref && typeof ref === "object") ref.current = e;
    targetRef.current = e;
  };

  return [targetRef, refHandler] as const;
};

export default useRefForward;
