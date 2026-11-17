import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import CardOverflow from "@mui/joy/CardOverflow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { useSelector } from "react-redux"; // ✅ YANGI: STOREdan o'qish uchun
import { createSelector } from "reselect"; // ✅ YANGI
import { retrievePopularDishes } from "./selector"; // ✅ YANGI
import { Product } from "../../../lib/types/product"; // ✅ YANGI

import { serverApi } from "../../../lib/config"; // ✅ YANGI: rasm manzili uchun

/** REDUX SLICE & SELECTOR **/
// ✅ YANGI: STOREdan popularDishes ni olib, { popularDishes } obyektiga o'raydi
const popularDishesRetriever = createSelector(
  retrievePopularDishes,
  (popularDishes) => ({ popularDishes }),
);
// ❌ ESKI: qo'lda yozilgan soxta ro'yxat (endi izohga olingan, ishlatilmaydi)
// const list = [
//   { productName: "Lavash", imagePath: "/img/lavash.webp" },
//   { productName: "Cutlet", imagePath: "/img/cutlet.webp" },
//   { productName: "Kebab", imagePath: "/img/kebab.webp" },
//   { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
// ];

export default function PopularDishes() {
  // ✅ YANGI: STOREdagi ma'lumotni komponentga olib keladi.
  // STORE o'zgarsa, komponent AVTOMATIK qayta chiziladi.
  const { popularDishes } = useSelector(popularDishesRetriever);
  console.log("popularDishes:", popularDishes);
  return (
    <div className="popular-dishes-frame">
      <Container>
        <Stack className="popular-section">
          <Box className="category-title">Popular Dishes</Box>
          <Stack className="cards-frame">
            {/* ❌ ESKI: list.length !== 0 ? ( list.map((ele, index) => { */}
            {popularDishes.length !== 0 ? (
              popularDishes.map((product: Product) => {
                // ✅ YANGI: rasm manzili = server manzili + serverdagi rasm yo'li
                // Masalan: http://localhost:3003/uploads/products/abc.jpeg
                const imagePath = `${serverApi}/${product.productImages[0]}`;
                return (
                  // ❌ ESKI: key={index}  →  ✅ YANGI: key={product._id} (noyob id)
                  <CssVarsProvider key={product._id}>
                    <Card className={"card"}>
                      <CardCover>
                        {/* ❌ ESKI: src={ele.imagePath}  →  ✅ YANGI: serverdan kelgan rasm */}
                        <img src={imagePath} alt="" />
                      </CardCover>
                      <CardCover className={"card-cover"} />
                      <CardContent sx={{ justifyContent: "flex-end" }}>
                        <Stack
                          flexDirection={"row"}
                          justifyContent={"space-between"}
                        >
                          <Typography
                            level="h2"
                            fontSize="lg"
                            textColor="#fff"
                            mb={1}
                          >
                            {/* ❌ ESKI: {ele.productName} → ✅ YANGI: */}
                            {product.productName}
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: "md",
                              color: "neutral.300",
                              alignItems: "center",
                              display: "flex",
                            }}
                          >
                            {/* ❌ ESKI: 20 (qotirilgan son) → ✅ YANGI: haqiqiy ko'rishlar soni */}
                            {product.productViews}
                            <VisibilityIcon
                              sx={{ fontSize: 25, marginLeft: "5px" }}
                            />
                          </Typography>
                        </Stack>
                      </CardContent>
                      <CardOverflow
                        sx={{
                          display: "flex",
                          gap: 1.5,
                          py: 1.5,
                          px: "var(--Card-padding)",
                          borderTop: "1px solid",
                          height: "60px",
                        }}
                      >
                        <Typography
                          startDecorator={<DescriptionOutlinedIcon />}
                          textColor="neutral.300"
                        >
                          {/* ❌ ESKI: This is delicious meal (qotirilgan matn) → ✅ YANGI: */}
                          {product.productDesc}
                        </Typography>
                      </CardOverflow>
                    </Card>
                  </CssVarsProvider>
                );
              })
            ) : (
              <Box className="no-data">No popular dishes available</Box>
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
