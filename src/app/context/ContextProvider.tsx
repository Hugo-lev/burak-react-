import React, { ReactNode, useState } from "react";
import Cookies from "universal-cookie";
import { Member } from "../../lib/types/member";
import { GlobalContext } from "../hooks/useGlobals";

// Butun ilova bo'ylab kirgan foydalanuvchi ma'lumotlarini tarqatuvchi Context Provider
const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const cookies = new Cookies();
  // Agar cookie'da accessToken bo'lmasa, localStorage'dagi eski ma'lumotlarni tozalaymiz
  if (!cookies.get("accessToken")) localStorage.removeItem("memberData");

  // Login bo'lgan foydalanuvchi state'i: boshlang'ich qiymat localStorage'dan olinadi
  const [authMember, setAuthMember] = useState<Member | null>(
    localStorage.getItem("memberData")
      ? JSON.parse(localStorage.getItem("memberData") as string)
      : null,
  );

  console.log(" === verify === ");

  // authMember va uni o'zgartiruvchi funksiyani barcha bolalar (children) ga taqdim etamiz
  return (
    <GlobalContext.Provider value={{ authMember, setAuthMember }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default ContextProvider;
