import React, { useState, useMemo } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import OverviewChat from "components/OverviewChat";
import { useGetSalesQuery } from "store/query/api";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Daily = () => {
  const [startDate, setStartDate] = useState(new Date("2021-02-01"));
  const [endDate, setEndDate] = useState(new Date("2021-03-01"));

  const { data } = useGetSalesQuery();
  const theme = useTheme();

  const [formattedData] = useMemo(() => {
    if (!data) return [];
    const { dailyData } = data;

    const totalSalesLine = {
      id: "totalSales",
      color: theme.palette.secondary.main,
      data: [],
    };

    const totalUnitsLine = {
      id: "totalSales",
      color: theme.palette.secondary[600],
      data: [],
    };

    Object.values(dailyData).forEach(({ data, tatalSales, totalUnits }) => {});

    return [[totalSalesLine], [totalUnitsLine]];
  }, [data]); //eslint-disable-line react-hooks/exhaustive-deps

  return <div>Daily</div>;
};

export default Daily;
