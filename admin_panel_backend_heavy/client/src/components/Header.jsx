import React from "react";
import { Box, useTheme, Typography } from "@mui/material";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();

  return (
    <Box>
      <Typography
        variant="h2"
        color={theme.palette.secondary[100]}
        sx={{ mb: "5px" }}
        fontWeight={"bold"}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={theme.palette.secondary[100]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
