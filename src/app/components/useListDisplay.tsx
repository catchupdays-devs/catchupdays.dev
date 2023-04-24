import { Dispatch, SetStateAction, useEffect, useState } from "react";

const getStorageValue = (key: string, defaultValue: string) => {
  // getting stored value
  const saved = localStorage.getItem(key);
  if (saved) {
    return JSON.parse(saved);
  }

  return defaultValue;
};

export const useLocalStorage = <T,>(key: string, defaultValue: string) => {
  const [value, setValue] = useState<T>(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    // storing input name
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as [T, Dispatch<SetStateAction<T>>];
};

export const useListDisplay = <T = "list" | "headlinedList",>() => {
  const [listDisplay, setListDisplay] = useLocalStorage<
    "list" | "headlinedList"
  >("wishlist.listDisplay", "list");

  // @ts-ignore
  return [listDisplay, setListDisplay] as [T, Dispatch<SetStateAction<T>>];
};
