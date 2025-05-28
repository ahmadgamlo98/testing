import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { cacheService } from "utils/cacheService";

import {
  DashboardState,
  FetchUsersRequest,
  FetchUsersResponse,
  SocketProps,
  User
} from "./dashboard.type";

const initialState: DashboardState = {
  users: [],
  socketData: []
};

export const fetchUsers = async (
  forceRefresh: boolean = false
): Promise<User[]> => {
  const cacheKey = "users";
  const cachedData = cacheService.get<User[]>(cacheKey, forceRefresh);

  if (cachedData) {
    console.log(`Using cached data for ${cacheKey}`);
    return cachedData;
  }

  console.log(`Making new API call for ${cacheKey}`);
  const response = await axios.get<User[]>(
    "https://jsonplaceholder.typicode.com/users"
  );

  cacheService.set(cacheKey, response.data);
  return response.data;
};

export const fetchUsersPaginated = async (
  data: FetchUsersRequest
): Promise<FetchUsersResponse> => {
  const cacheKey = `users_paginated_${data.page}_${data.perPage}`;
  const cachedData = cacheService.get<FetchUsersResponse>(
    cacheKey,
    data.forceRefresh
  );

  if (cachedData) {
    console.log(`Using cached data for ${cacheKey}`);
    return cachedData;
  }

  console.log(`Making new API call for ${cacheKey}`);
  const response = await axios.get<FetchUsersResponse>(
    "https://reqres.in/api/users",
    {
      params: {
        page: data.page,
        per_page: data.perPage
      },
      headers: {
        " x-api-key": "reqres-free-v1"
      }
    }
  );

  cacheService.set(cacheKey, response.data);
  return response.data;
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setUsers: (state: DashboardState, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    // setSocketData: (
    //   state: DashboardState,
    //   action: PayloadAction<SocketProps>
    // ) => {
    //   if (!Array.isArray(state.socketData)) {
    //     state.socketData = [];
    //   }
    //   state.socketData.push(action.payload);
    // },
    setSocketData: (
      state: DashboardState,
      action: PayloadAction<SocketProps[]>
    ) => {
      state.socketData = action.payload;
    },
    reset: () => initialState
  }
});

export const dashboardActions = {
  ...dashboardSlice.actions
};
