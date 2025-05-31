import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { cacheService } from "utils/cacheService";

import {
  AddUserRequest,
  AddUserResponse,
  CryptoCoinDataProps,
  DashboardState,
  FetchUsersRequest,
  FetchUsersResponse,
  SocketProps,
  User
} from "./dashboard.type";

const initialState: DashboardState = {
  users: [],
  socketData: [],
  cryptoBTCData: {
    e: "",
    E: 0,
    M: false,
    T: 0,
    m: false,
    p: "",
    q: "",
    s: "",
    t: 0
  },
  cryptoETCData: {
    e: "",
    E: 0,
    M: false,
    T: 0,
    m: false,
    p: "",
    q: "",
    s: "",
    t: 0
  },
  cryptoSOLData: {
    e: "",
    E: 0,
    M: false,
    T: 0,
    m: false,
    p: "",
    q: "",
    s: "",
    t: 0
  },
  cryptoBNBData: {
    e: "",
    E: 0,
    M: false,
    T: 0,
    m: false,
    p: "",
    q: "",
    s: "",
    t: 0
  }
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

export const addUser = async (data: AddUserRequest) => {
  const url = data.id
    ? `https://reqres.in/api/users/${data.id}`
    : `https://reqres.in/api/users`;

  const method = data.id ? "patch" : "post";

  const response = await axios<AddUserResponse>({
    method,
    url,
    data,
    headers: {
      " x-api-key": "reqres-free-v1"
    }
  });
  return response.data;
};

export const fetchCoin = async () => {
  const response = await axios.get(
    "https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1h"
  );

  return response.data;
};

export const getLastPrice = async () => {
  const response = await axios.get(
    "https://api.binance.com/api/v3/ticker/price"
  );

  return response.data;
};

export const getBookOrderhistory = async () => {
  const response = await axios.get(
    "https://api.binance.com/api/v3/depth?symbol=BTCUSDT"
  );

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
    setCryptoCoinDataBTC: (
      state: DashboardState,
      action: PayloadAction<CryptoCoinDataProps>
    ) => {
      state.cryptoBTCData = action.payload;
    },
    setCryptoCoinDataETC: (
      state: DashboardState,
      action: PayloadAction<CryptoCoinDataProps>
    ) => {
      state.cryptoETCData = action.payload;
    },
    setCryptoCoinDataSOL: (
      state: DashboardState,
      action: PayloadAction<CryptoCoinDataProps>
    ) => {
      state.cryptoSOLData = action.payload;
    },
    setCryptoCoinDataBNB: (
      state: DashboardState,
      action: PayloadAction<CryptoCoinDataProps>
    ) => {
      state.cryptoBNBData = action.payload;
    },

    reset: () => initialState
  }
});

export const dashboardActions = {
  ...dashboardSlice.actions
};
