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
};

export type UsersProviderProps = {
  children: ReactNode;
};
