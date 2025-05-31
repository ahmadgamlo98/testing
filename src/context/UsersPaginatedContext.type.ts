import { ReactNode } from "react";

export type UsersPagination = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export type PaginatedResponse = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: UsersPagination[];
};

export type UsersContextType = {
  usersPaginatedContext: PaginatedResponse | null;
  setUsersPaginatedContext: React.Dispatch<
    React.SetStateAction<PaginatedResponse | null>
  >;
  socketMessageContext: SocketMessageContextProps[] | null;
  setSocketMessageContext: React.Dispatch<
    React.SetStateAction<SocketMessageContextProps[] | null>
  >;
};

export type UsersProviderProps = {
  children: ReactNode;
};

export type SocketMessageContextProps = {
  timestamp: string;
  value: string;
  id: string;
};
