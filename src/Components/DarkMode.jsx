import React, { useCallback, useEffect, useState } from "react";
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { IconButton } from "@mui/material";
import LightModeIcon from '@mui/icons-material/LightMode';

const DarkMode = () => {
  // theme
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "system"
  );
  const element = document.documentElement;
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  const onWindowMatch = useCallback(() => {
    if (localStorage.theme === "dark" || (!("theme" in localStorage) && darkQuery.matches)) {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
  }, [darkQuery, element])

  // const onWindowMatch = () => {
  //   if (localStorage.theme === "dark" || (!("theme" in localStorage) && darkQuery.matches)) {
  //     element.classList.add("dark");
  //   } else {
  //     element.classList.remove("dark");
  //   }
  // };
  // onWindowMatch();

  useEffect(() => {
    switch (theme) {
      case "dark":
        element.classList.add("dark");
        localStorage.setItem("theme", "dark");
        break;
      case "light":
        element.classList.remove("dark");
        localStorage.setItem("theme", "light");
        break;
      default:
        localStorage.removeItem("theme");
        onWindowMatch();
        break;
    }
  }, [theme, element.classList, onWindowMatch]);

  // auto detect theme change in os
  darkQuery.addEventListener("change", (e) => {
    if (!("theme" in localStorage)) {
      if (e.matches) {
        element.classList.add("dark");
      } else {
        element.classList.remove("dark");
      }
    }
  });

 

  return (
    <div className="absolute top-5 right-5">
      <IconButton onClick={() => {theme === "light" ? setTheme("dark") : setTheme("light")}} className="dark:text-white">
        {theme === "light" ? 
        <DarkModeOutlinedIcon/>
        :
        <LightModeIcon className="dark:text-white"/> 
        }
      </IconButton>
    </div>
  );
};

export default DarkMode;
