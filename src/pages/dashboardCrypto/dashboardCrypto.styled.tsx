import { Box } from "@mui/material";
import { styled } from "styled-components";

export const StyledBox = styled(Box)`
  flex-direction: row;

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;
