import { useState, useEffect } from "react";

type Value<T> = T | ((val: T) => T);
type StorageType = "localStorage" | "sessionStorage";

type StorageOptions<T> = {
  initialValue?: Value<T>;
  initialStorageType?: StorageType;
};

const useStorage = <T>(
  key: string,
  { initialValue, initialStorageType }: StorageOptions<T> = {}
) => {
  const [storageType, setStorageType] = useState(initialStorageType);

  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item =
        storageType ??
        (localStorage.getItem(key) || sessionStorage.getItem(key));

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: Value<T>, type: StorageType) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      if (type === "localStorage") {
        if (window.sessionStorage.getItem(key)) {
          window.sessionStorage.removeItem(key);
        }
      } else if (window.localStorage.getItem(key)) {
        window.localStorage.removeItem(key);
      }

      window[type].setItem(key, JSON.stringify(valueToStore));

      setStoredValue(valueToStore);
      setStorageType(type);
    } catch (error) {
      console.error(error);
    }
  };

  const removeItem = (type?: StorageType) => {
    try {
      if (type) window[type].removeItem(key);

      if (!type) {
        if (window.sessionStorage.getItem(key)) {
          window.sessionStorage.removeItem(key);
        } else if (window.localStorage.getItem(key)) {
          window.localStorage.removeItem(key);
        }
      }

      setStorageType(type);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    try {
      const item =
        storageType ??
        (localStorage.getItem(key) || sessionStorage.getItem(key));

      if (item) setStoredValue(JSON.parse(item));
    } catch (error) {
      console.error(error);
    }
  }, [key, storageType]);

  return { storedValue, setValue, removeItem };
};

export default useStorage;
