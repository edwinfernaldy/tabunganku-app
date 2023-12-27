"use client";

import { useSessionStore } from "@/store";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const userId = useSessionStore((state) => state.userId);

  useEffect(() => {
    if (!userId) {
      router.push("/");
    }
  }, [router, userId]);

  return <>{children}</>;
};

export default ProtectedRoutes;
