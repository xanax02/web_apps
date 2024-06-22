import { Box, useMediaQuery } from "@mui/material";
import { useGetProductsQuery } from "store/query/api";
import Header from "components/Header";
import Product from "components/Product";

export default function Products() {
  const { data, isLoading } = useGetProductsQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  return (
    <Box m={"1.5rem 2.5rem"}>
      <Header title={"Products"} subtitle={"See your list of products"} />
      {data || !isLoading ? (
        <Box
          mt={"20px"}
          display={"grid"}
          gridTemplateColumns={
            isNonMobile ? "repeat(4, minmax(0, 1fr))" : "repeat(1, 1fr)"
          }
          justifyContent={"space-between"}
          rowGap={"20px"}
          columnGap={"1.33%"}
          // sx={{
          //   "& > div": {
          //     gridColumn: isNonMobile ? undefined : "span 4",
          //   },
          // }}
        >
          {data.map(
            ({
              _id,
              name,
              description,
              price,
              rating,
              category,
              supply,
              stat,
            }) => {
              return (
                <Product
                  key={_id}
                  _id={_id}
                  category={category}
                  description={description}
                  name={name}
                  price={price}
                  rating={rating}
                  stat={stat}
                  supply={supply}
                />
              );
            }
          )}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
}
