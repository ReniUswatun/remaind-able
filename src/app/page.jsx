"use client";

import { getSession, logout } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [isGettingSessionInfo, setIsGettingSessionInfo] = useState(true);
  const [session, setSession] = useState();
  const router = useRouter();

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
      <p>Ini adalah halaman dashboard</p>
      <p>Email Anda: {session.email}</p>
      <p>Username Anda: {session.username}</p>
      <button onClick={() => onClickButtonLogout()}>Logout</button>
    </>
  );
}
