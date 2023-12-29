"use client";

import { getSession, logout } from "@/lib/auth";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [isGettingSessionInfo, setIsGettingSessionInfo] = useState(true);
  const [session, setSession] = useState();
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const { themes, setTheme } = useTheme();

  // component mounted, atau mulai sisi client
  useEffect(() => {
    // intinya, buat cek apakah local storage udah ready atau belum

    // mendapatkan info sesi
    setSession(getSession());

    // setelah berhasil mendapatkan info sesi
    setIsGettingSessionInfo(false);
  }, []);

  const onClickButtonLogout = () => {
    logout();
    router.replace("/login");
  };

  if (isGettingSessionInfo) {
    return (
      <>
        <p>Mendapatkan info autentikasi...</p>
      </>
    );
  }

  if (!session) {
    return router.replace("/login");
  }

  return (
    <>
      <Navbar>
        <NavbarBrand>
          <p className="font-bold text-inherit">REMAINABLE</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="#">
              Features
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#" aria-current="page">
              Customers
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Integrations
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href="#">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button
              color="danger"
              variant="flat"
              onClick={() => onClickButtonLogout()}
            >
              Keluar
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <div className="mt-4 max-w-[480px] mx-auto">
        <Card className="p-4">
          <CardHeader>
            <div>
              <p className="font-bold uppercase">Autentikasi</p>
              <p>
                Masukkan beberapa informasi berikut untuk masuk ke akun
                Remainable.
              </p>
            </div>
          </CardHeader>
          <CardBody className="gap-2">
            {isLogin || <Input label="Nama pengguna" />}
            {!isLogin && <Input label="Nama pengguna" />}
            <Input label="Alamat email" />
            <Input label="Kata sandi" />
          </CardBody>
          <CardFooter>
            <div className="w-full flex flex-col gap-2">
              <Button color="primary" className="block w-full">
                {isLogin ? "Masuk" : "Daftar"}
              </Button>
              <Button variant="light" onClick={() => setIsLogin(!isLogin)}>
                {isLogin
                  ? "Belum punya akun? Daftar sekarang juga"
                  : "Sudah punya akun? Masuk sekarang"}
              </Button>
            </div>
          </CardFooter>
        </Card>

        <Button onClick={() => setTheme("light")}>Light mode</Button>
        <Button onClick={() => setTheme("dark")}>Dark mode</Button>
      </div>
    </>
  );
}
