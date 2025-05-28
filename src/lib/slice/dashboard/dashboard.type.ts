export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
};

export type SocketProps = {
  timestamp: string;
  value: string;
  id: string;
};

export type DashboardState = {
  users: User[];
  socketData: SocketProps[];
};

export type FetchUsersRequest = {
  page: number;
  perPage: number;
  forceRefresh: boolean;
};

export type FetchUsersResponse = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: UsersPagination[];
};

export type UsersPagination = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};
