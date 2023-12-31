import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import { getSession, logout } from "@/lib/auth.js";
import { ThemeSwitch } from "./toogle-theme.jsx";
import { useRouter } from "next/navigation.js";

export default function NavbarComponent() {
  const session = getSession();
  const router = useRouter();
  const onClickButtonLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <>
      <Navbar>
        <NavbarBrand>
          <p className="font-bold text-xl text-inherit">RemainAble</p>
        </NavbarBrand>

        <NavbarContent as="div" justify="end">
          <ThemeSwitch />
          <p className="font text-inherit">
            Halo, {session.user.split(" ")[0]}
          </p>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                radius="md"
                as="button"
                className="transition-transform"
                color="secondary"
                showFallback
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem
                key="logout"
                color="danger"
                onClick={() => onClickButtonLogout()}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>
    </>
  );
}
