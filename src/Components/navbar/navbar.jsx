"use client";

import { getSession, logout } from "@/lib/auth.js";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { ThemeSwitch } from "./toogle-theme";

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
