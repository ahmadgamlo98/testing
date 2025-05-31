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

export type CryptoCoinDataProps = {
  e: string;
  E: number;
  M: boolean;
  T: number;
  m: boolean;
  p: string;
  q: string;
  s: string;
  t: number;
};

export type DashboardState = {
  users: User[];
  socketData: SocketProps[];
  cryptoBTCData: CryptoCoinDataProps;
  cryptoETCData: CryptoCoinDataProps;
  cryptoBNBData: CryptoCoinDataProps;
  cryptoSOLData: CryptoCoinDataProps;
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

export type AddUserRequest = {
  name: string;
  job: string;
  id?: string;
};

export type AddUserResponse = {
  name: string;
  job: string;
  id: string;
  createdAt: string;
};
