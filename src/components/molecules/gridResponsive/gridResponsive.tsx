import { Box, Typography } from "@mui/material";
import { useEffect } from "react";

import { GridResponsiveProps } from "./gridResponsive.type";

const GridResponsive = ({ data }: GridResponsiveProps) => {
  useEffect(() => {
    console.log("ahmad");
  }, []);

  return (
    <Box>
      <Box display={"flex"} gap={3}>
        <Typography>name : </Typography>
        <Typography>{data.name}</Typography>
      </Box>
      <Box display={"flex"} gap={3}>
        <Typography>email : </Typography>
        <Typography>{data.email}</Typography>
      </Box>
    </Box>
  );
};

export default GridResponsive;
