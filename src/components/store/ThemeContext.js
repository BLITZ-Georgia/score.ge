"use client";
import React, { createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useLocalStorage("theme", "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  const toggleDarkMode = (checked) => {
    setMode(checked ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
