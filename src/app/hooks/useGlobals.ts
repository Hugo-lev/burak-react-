import { createContext, useContext } from "react";
import { Member } from "../../lib/types/member";

// Global kontekst interfeysi: login qilgan a'zo va uni yangilash funksiyasi
interface GlobalInterface {
  authMember: Member | null;
  setAuthMember: (member: Member | null) => void;
}

// Global Context yaratish
export const GlobalContext = createContext<GlobalInterface | undefined>(
  undefined,
);

// Ixtiyoriy komponentda oson foydalanish uchun maxsus Hook
export const useGlobals = () => {
  const context = useContext(GlobalContext);
  // Agar komponent ContextProvider bilan o'ralmagan bo'lsa xatolik beradi
  if (context === undefined) throw new Error("useGlobals without Provider");
  return context;
};
