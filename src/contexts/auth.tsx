import api from "@/global/config/axios";
import { createContext, ReactNode } from "react";

interface IAuthContext {}

const AuthContext = createContext({} as IAuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const AUTH_TOKEN = process.env.NEXT_PUBLIC_TOKEN_API;

  api.defaults.headers.common["Authorization"] = "Bearer " + AUTH_TOKEN;

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};
