import { Box } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

import { CryptoProps } from "./crypto.type";

const Crypto: React.FC<CryptoProps> = React.memo(
  ({ data }) => {
    const prevValueRef = useRef<number | null>(null);
    const [color, setColor] = useState("black");

    useEffect(() => {
      const currentValue = Number(data.value);
      const prevValue = prevValueRef.current;

      if (!isNaN(currentValue)) {
        if (prevValue !== null) {
          if (currentValue > prevValue) {
            setColor("green");
          } else if (currentValue < prevValue) {
            setColor("red");
          } else {
            setColor("black");
          }
        }
        prevValueRef.current = currentValue;
      }
    }, [data.value]);

    return (
      <Box display="flex" alignItems="center" gap="15px">
        <h2>{data.id}:</h2>
        <h2 style={{ color }}>{data.value}</h2>
      </Box>
    );
  },
  (prevProps, nextProps) =>
    prevProps.data.id === nextProps.data.id &&
    prevProps.data.value === nextProps.data.value
);

export default Crypto;
