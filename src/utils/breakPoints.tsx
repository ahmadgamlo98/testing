import { useMediaQuery, useTheme } from "@mui/material";

export const useBreakpoint = () => {
  const theme = useTheme();

  return {
    isXs: useMediaQuery(theme.breakpoints.only("xs")),
    isSm: useMediaQuery(theme.breakpoints.only("sm")),
    isMd: useMediaQuery(theme.breakpoints.only("md")),
    isLg: useMediaQuery(theme.breakpoints.only("lg")),
    isXl: useMediaQuery(theme.breakpoints.only("xl")),
    isMobile: useMediaQuery(theme.breakpoints.down("sm")),
    isTablet: useMediaQuery(theme.breakpoints.between("sm", "md")),
    isDesktop: useMediaQuery(theme.breakpoints.up("md"))
  };
};
