import { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useGetProductsQuery } from "store/query/api";
import Header from "components/Header";

export default function Products() {
  return (
    <Box>
      <Header title={"Products"} subtitle={"See your list of products"} />
    </Box>
  );
}
