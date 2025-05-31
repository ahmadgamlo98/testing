// components/atoms/CryptoValue.tsx
import React, { useEffect, useRef, useState } from "react";

type CryptoValueProps = {
  value: number;
};

const CryptoValueGrid: React.FC<CryptoValueProps> = ({ value }) => {
  const prevValueRef = useRef<number | undefined>();
  const [color, setColor] = useState("black");

  useEffect(() => {
    const prev = prevValueRef.current;

    if (prev !== undefined) {
      if (value > prev) {
        setColor("green");
      } else if (value < prev) {
        setColor("red");
      } else {
        setColor("black");
      }
    }

    prevValueRef.current = value;
  }, [value]);

  return <span style={{ color, transition: "color 0.3s ease" }}>{value}</span>;
};

export default CryptoValueGrid;
