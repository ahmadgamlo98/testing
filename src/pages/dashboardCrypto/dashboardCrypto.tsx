import { Box, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import BorderBook from "components/molecules/borderBook/borderBook";
import CryptoCoin from "components/molecules/cryptoCoin/cryptoCoin";
import {
  dashboardActions,
  fetchCoin,
  getBookOrderhistory,
  getLastPrice
} from "lib/slice/dashboard";
import { RootState } from "lib/store/store";
import { formatNumber } from "utils/formatNumber";
import { useWebSocket } from "utils/webSocketService";

import { StyledBox } from "./dashboardCrypto.styled";
import { CryptoCoinDataProps } from "./dashboardCrypto.type";

const DashboardCrypto = () => {
  const dispatch = useDispatch();
  const handleSaveBTCToStore = (message: CryptoCoinDataProps) => {
    dispatch(dashboardActions.setCryptoCoinDataBTC(message));
  };

  const handleSaveETCToStore = (message: CryptoCoinDataProps) => {
    dispatch(dashboardActions.setCryptoCoinDataETC(message));
  };
  const handleSaveBNBToStore = (message: CryptoCoinDataProps) => {
    dispatch(dashboardActions.setCryptoCoinDataBNB(message));
  };

  const handleSaveSOLToStore = (message: CryptoCoinDataProps) => {
    dispatch(dashboardActions.setCryptoCoinDataSOL(message));
  };

  //   const handleSaveMultipleToStore = (message: CryptoCoinDataProps) => {
  //     dispatch(dashboardActions.setCryptoCoinDataMultiple(message));
  //   };

  useWebSocket(
    "wss://stream.binance.com:9443/ws/btcusdt@trade",
    handleSaveBTCToStore
  );

  useWebSocket(
    "wss://stream.binance.com:9443/ws/ethusdt@trade",
    handleSaveETCToStore
  );

  useWebSocket(
    "wss://stream.binance.com:9443/ws/bnbusdt@trade",
    handleSaveBNBToStore
  );

  useWebSocket(
    "wss://stream.binance.com:9443/ws/solusdt@trade",
    handleSaveSOLToStore
  );

  const CryptoBTCData = useSelector(
    (state: RootState) => state.dashboard.cryptoBTCData
  );
  const CryptoETCData = useSelector(
    (state: RootState) => state.dashboard.cryptoETCData
  );
  const CryptoSOLData = useSelector(
    (state: RootState) => state.dashboard.cryptoSOLData
  );
  const CryptoBNBData = useSelector(
    (state: RootState) => state.dashboard.cryptoBNBData
  );

  const [coinCharts, setCoinCharts] = useState<any>();
  const [coinLastPrice, setCoinLastPrice] = useState<any>();
  const [bookOrderHistory, setBookOrderHistory] = useState<{
    lastUpdateId: number;
    bids: [];
    asks: [];
  }>();

  const test = [];
  test.push(
    { ...CryptoBTCData, id: 1 },
    { ...CryptoETCData, id: 2 },
    { ...CryptoSOLData, id: 3 },
    { ...CryptoBNBData, id: 4 }
  );

  const columns = useMemo<GridColDef[]>(
    () => [
      { field: "id", headerName: "id", width: 90 },
      { field: "s", headerName: "Name", width: 90 },
      {
        field: "p",
        headerName: "Price",
        width: 150
      }
    ],
    []
  );

  const getCoin = async () => {
    const response = await fetchCoin();
    setCoinCharts(response);
  };
  const getCoinLastPrice = async () => {
    const response = await getLastPrice();
    response.map((item, index) => {
      if (item.symbol === "BTCUSDT") {
        setCoinLastPrice(item);
      }
    });
  };
  const getCoinHistory = async () => {
    const response = await getBookOrderhistory();
    setBookOrderHistory(response);
  };

  useEffect(() => {
    getCoin();
    getCoinLastPrice();
    getCoinHistory();
  }, []);

  return (
    <Box width={"100%"} display={"flex"} gap={5} flexDirection={"column"}>
      <h1>Crypto</h1>
      <StyledBox display={"flex"} gap={5}>
        <CryptoCoin data={CryptoBTCData} />
        <CryptoCoin data={CryptoETCData} />
        <CryptoCoin data={CryptoSOLData} />
        <CryptoCoin data={CryptoBNBData} />
      </StyledBox>
      <Box display={"flex"} gap={2}>
        <Box bgcolor={"#E8E8E8"} borderRadius={5}>
          <Box margin={2}>
            <Box>
              <h3>{CryptoBTCData.s}</h3>
              <h3>{CryptoBTCData.p}</h3>
            </Box>
            <LineChart width={500} height={300} data={coinCharts}>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <Line type="monotone" dataKey="uv" stroke="#8884d8" />
              <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
            </LineChart>
          </Box>
        </Box>
        <Box bgcolor={"#E8E8E8"} borderRadius={5}>
          {/* <BorderBook
            coinLastPrice={coinLastPrice}
            bookOrderHistory={bookOrderHistory}
          /> */}
          <Box margin={2} alignItems={"center"}>
            <h3>Order Book</h3>
            <Box bgcolor={"white"} borderRadius={2}>
              <Box margin={2}>
                <Typography>Current Price</Typography>
                <Typography>{formatNumber(coinLastPrice?.price)}</Typography>
              </Box>
              <Box>
                <Typography>Sell Orders</Typography>
                {bookOrderHistory?.bids.map((item, index) => {
                  if (index > 5) {
                    return;
                  }
                  return (
                    <Box key={index} display={"flex"} gap={2}>
                      <Typography>{formatNumber(item[0])}</Typography>
                      <Typography>{formatNumber(item[1])}</Typography>
                    </Box>
                  );
                })}
                <Typography>Buy Orders</Typography>
                {bookOrderHistory?.asks.map((item, index) => {
                  if (index > 5) {
                    return;
                  }
                  return (
                    <Box key={index} display={"flex"} gap={2}>
                      <Typography>{formatNumber(item[0])}</Typography>
                      <Typography>{formatNumber(item[1])}</Typography>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <DataGrid
          rows={test}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5
              }
            }
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
};
export default DashboardCrypto;
