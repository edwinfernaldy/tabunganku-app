import { create } from "zustand";

interface LandingState {
  type: "login" | "register";
  setType: (params: "login" | "register") => void;
}

export const useLandingStore = create<LandingState>()((set) => ({
  type: "login",
  setType: (params: "login" | "register") => set(() => ({ type: params }))
}));
