import { createContext, useContext, useState } from "react";

import {
  PaginatedResponse,
  UsersContextType,
  UsersProviderProps
} from "./UsersPaginatedContext.type";

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export const UsersProvider = ({ children }: UsersProviderProps) => {
  const [usersPaginatedContext, setUsersPaginatedContext] =
    useState<PaginatedResponse | null>(null);

  return (
    <UsersContext.Provider
      value={{ usersPaginatedContext, setUsersPaginatedContext }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return context;
};
