"use client";

import { Button } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { MoonIcon } from "./MoonIcon";
import { SunIcon } from "./SunIcon";

export default function ThemeSwitch() {
  const { setTheme, theme } = useTheme();

  const switchTheme = () => {
    if (theme == "light") setTheme("dark");
    else setTheme("light");
  };

  return (
    <>
      <Button isIconOnly onClick={() => switchTheme()}>
        {theme == "light" ? <MoonIcon /> : <SunIcon />}
      </Button>
    </>
  );
}
