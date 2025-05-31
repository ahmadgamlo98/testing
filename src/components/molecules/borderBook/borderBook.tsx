import { Box, Typography } from "@mui/material";

import { formatNumber } from "utils/formatNumber";

export const BorderBook = (coinLastPrice, bookOrderHistory) => (
  <Box margin={2} alignItems={"center"}>
    <h3>Order Book</h3>
    <Box bgcolor={"white"} borderRadius={2}>
      <Box margin={2}>
        <Typography>Current Price</Typography>
        <Typography>{formatNumber(coinLastPrice?.price)}</Typography>
      </Box>
      <Box>
        <Typography>Sell Orders</Typography>
        {bookOrderHistory?.bids.map((item, index) => (
          <Box key={index} display={"flex"} gap={2}>
            <Typography>{formatNumber(item[0])}</Typography>
            <Typography>{formatNumber(item[1])}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  </Box>
);
export default BorderBook;
