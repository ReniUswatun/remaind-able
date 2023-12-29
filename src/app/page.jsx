"use client";

import NavbarComponent from "@/Components/navbar";
import { getSession } from "@/lib/auth";
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
      <NavbarComponent />
    </>
  );
}
