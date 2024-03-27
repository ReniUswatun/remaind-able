import { useTheme } from "next-themes";
import { MoonIcon } from "./MoonIcon.jsx";
import { SunIcon } from "./SunIcon.jsx";

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex flex-col gap-2">
      <div
        variant="flat"
        color="secondary"
        onClick={() => {
          setTheme(theme == "dark" ? "light" : "dark");
        }}
      >
        {theme == "light" ? <MoonIcon /> : <SunIcon />}
      </div>
    </div>
  );
};

export { ThemeSwitch };
