"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  useEffect(() => {
    if (status === "loading") {
      return;
    }
    
    if (!session) {
      router.push("/login");
    }
  }, [session, status, router]);
  
  if (status === "loading") {
    return <div className="flex items-center justify-center h-screen">Carregando...</div>;
  }
  
  if (!session) {
    return null; 
  }
  
  return <>{children}</>;
}