"use client";

import type React from "react";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useWeb3 } from "../store/web3-provider";

type RouteGuardProps = {
  children: React.ReactNode;
};

export function RouteGuard({ children }: RouteGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, role } = useWeb3();

  useEffect(() => {
    // Si no está autenticado y no está en la página principal, redirigir a la página principal
    if (!isAuthenticated && pathname !== "/") {
      router.push("/");
      return;
    }

    // Si está autenticado y está en la página principal, redirigir al dashboard correspondiente
    if (isAuthenticated && pathname === "/") {
      if (role === "admin") {
        router.push("/dashboard/admin");
      } else {
        router.push("/dashboard");
      }
      return;
    }

    // Verificar acceso a rutas de administrador
    const isAdminRoute = pathname.startsWith("/dashboard/admin");
    if (isAuthenticated && isAdminRoute && role !== "admin") {
      router.push("/dashboard");
      return;
    }
  }, [isAuthenticated, pathname, role, router]);

  return <>{children}</>;
}
