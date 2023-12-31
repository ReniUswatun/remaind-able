import { MoonIcon } from "./MoonIcon.jsx";
import { SunIcon } from "./SunIcon.jsx";
import { Button, Switch, VisuallyHidden, useSwitch } from "@nextui-org/react";
import { useTheme } from "next-themes";

const ThemeSwitch = (props) => {
  const { Component, isSelected, getBaseProps, getInputProps } =
    useSwitch(props);

  const { themes, setTheme } = useTheme();
  return (
    <>
      <div className="flex flex-col gap-2">
        <Component {...getBaseProps()}>
          <VisuallyHidden>
            <input {...getInputProps()} />
          </VisuallyHidden>
          <div variant="flat" color="secondary">
            {isSelected ? <MoonIcon /> : <SunIcon />}
            {setTheme(isSelected ? "dark" : "light")}
          </div>
        </Component>
      </div>
    </>
  );
};

export { ThemeSwitch };