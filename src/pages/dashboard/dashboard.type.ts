export type UsersPaginatedProps = {
  page: number;
  perPage: number;
};

export type UsersPaginatedData = {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
  email: string;
};

export type UserPaginatedResponse = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: UsersPaginatedData[];
};
