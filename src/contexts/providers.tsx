"use client";

import { queryClient } from "@/global/config/reactQuery";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { AuthProvider } from "./auth";
import { FilterProvider } from "./filter";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <FilterProvider>{children}</FilterProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default Providers;
