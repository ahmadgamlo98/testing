import { Box, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

import { formatNumber } from "utils/formatNumber";

import { CryptoCoinDataProps } from "./cryptoCoin.type";

const CryptoCoinComponent: React.FC<CryptoCoinDataProps> = ({ data }) => {
  const prevValueRef = useRef<number | undefined>();
  const [color, setColor] = useState("black");
  const price = Number(data?.p);

  useEffect(() => {
    const prev = prevValueRef.current;

    if (prev !== undefined) {
      if (price > prev) {
        setColor("green");
      } else if (price < prev) {
        setColor("red");
      } else {
        setColor("black");
      }
    }

    prevValueRef.current = price;
  }, [price]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      bgcolor="#E8E8E8"
      borderRadius={4}
      width="100%"
      justifyContent="space-between"
    >
      <Box margin={2}>
        <Typography>{data?.s}</Typography>
        <Typography style={{ color }}>${formatNumber(data?.p)}</Typography>
      </Box>
    </Box>
  );
};

// Wrap with React.memo
const CryptoCoin = React.memo(CryptoCoinComponent);

export default CryptoCoin;
