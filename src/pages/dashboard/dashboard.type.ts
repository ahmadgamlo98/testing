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

export type SelectedUserProps = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
};
