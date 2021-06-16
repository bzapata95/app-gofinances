import React from "react";
import { AuthProvider } from "./auth";

interface Providers {
  children: React.ReactNode;
}

export function Providers({ children }: Providers) {
  return <AuthProvider>{children}</AuthProvider>;
}
