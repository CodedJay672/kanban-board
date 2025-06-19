"use client";

import { Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

const ThemeSwitch = () => {
  const { setTheme } = useTheme();

  return (
    <div className="w-full flex items-center gap-1 bg-gray-300 dark:bg-foreground-light overflow-hidden p-1 rounded-full">
      <Button
        onClick={() => setTheme("light")}
        className="w-[122px] h-[34px] bg-background dark:bg-transparent font-exo text-sm text-foreground-light dark:text-gray-light rounded-full"
      >
        <Sun
          size={16.67}
          className="text-foreground-light dark:text-gray-light"
        />
        Light
      </Button>
      <Button
        onClick={() => setTheme("dark")}
        className="w-[126px] h-[34px] bg-transparent dark:bg-dark-3 font-exo text-sm text-gray-light dark:text-white rounded-full"
      >
        <Sun size={16.67} className="text-gray-light dark:text-white" />
        Dark
      </Button>
    </div>
  );
};

export default ThemeSwitch;
