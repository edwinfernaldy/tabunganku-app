import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface LandingState {
  type: "login" | "register";
  setType: (params: "login" | "register") => void;
}

interface SessionState {
  userId: string;
  setUserId: (params: string) => void;
}

export const useLandingStore = create<LandingState>()((set) => ({
  type: "login",
  setType: (params: "login" | "register") => set(() => ({ type: params }))
}));

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      userId: "",
      setUserId: (params: string) => set(() => ({ userId: params }))
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);
