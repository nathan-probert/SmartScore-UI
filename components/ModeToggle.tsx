"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const isDarkTheme = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDarkTheme ? "light" : "dark");
  };

  return (
    <label className="pr-3 relative inline-flex items-center cursor-pointer h-[50px] max-[625px]:px-[10px]">
      <input type="checkbox" className="sr-only peer" aria-label="Switch for dark/light mode" onClick={toggleTheme}/>
      <div className="w-[60px] h-[34px] bg-slate-300 rounded-full relative inline-flex items-center justify-around
      after:content-[''] after:bg-slate-900 after:w-[28px] after:h-[28px] after:rounded-full after:absolute
      after:bottom-[3px] after:left-[3px] peer-checked:after:translate-x-[26px] after:transition-transform after:duration-[.4s]
      dark:after:bg-slate-200 dark:bg-slate-700">
        <Moon className="w-5 h-5 select-none fill-slate-900 dark:fill-slate-700"/>
        <Sun className="w-5 h-5 select-none fill-slate-300 dark:fill-slate-200"/>
      </div>
    </label>  
  );
}
