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

export const formatPrice = (price: number): string => {
  if (!price) {
    return "0,-";
  }
  const priceArray = price.toString().split(".");

  const integerPartWithCommas = priceArray[0].replace(
    /\B(?=(\d{3})+(?!\d))/g,
    "."
  );

  const formattedPrice =
    priceArray.length > 1
      ? `${integerPartWithCommas},${priceArray[1]}`
      : `${integerPartWithCommas},-`;

  return formattedPrice;
};
