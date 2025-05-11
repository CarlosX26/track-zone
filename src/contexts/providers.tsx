"use client";

import { queryClient } from "@/global/config/reactQuery";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { AuthProvider } from "./auth";
import { FilterProvider } from "./filter";
import { APIProvider } from "@vis.gl/react-google-maps";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <FilterProvider>
          <APIProvider apiKey={API_KEY}>{children}</APIProvider>
        </FilterProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default Providers;
