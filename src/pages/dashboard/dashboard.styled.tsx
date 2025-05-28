import { Box } from "@mui/material";
import styled from "styled-components";

export const GridWrapper = styled.div`
  @media (max-width: 500px) {
    display: none;
  }
`;

export const ResponsiveBox = styled(Box)`
  display: none;

  @media (max-width: 500px) {
    display: block;
  }
`;

export const StyledBox = styled(Box)`
  flex-direction: row;

  @media (max-width: 500px) {
    flex-direction: row;
  }
`;
