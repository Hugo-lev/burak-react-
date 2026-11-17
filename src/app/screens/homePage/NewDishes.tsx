import React from "react";
import { Box, Container, Stack } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Divider from "../../components/divider";

// ❌ ESKI: qo'lda yozilgan soxta ro'yxat (endi izohga olingan)
// const newDishes = [
//   { productName: "Cutlet", imagePath: "/img/cutlet.webp" },
//   { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
//   { productName: "Kebab", imagePath: "/img/kebab.webp" },
//   { productName: "Lavash", imagePath: "/img/lavash.webp" },
// ];
import { useSelector } from "react-redux"; // ✅ YANGI
import { createSelector } from "reselect"; // ✅ YANGI
import { retrieveNewDishes } from "./selector"; // ✅ YANGI: yangi taomlarni o'quvchi selector
import { Product } from "../../../lib/types/product"; // ✅ YANGI
import { serverApi } from "../../../lib/config"; // ✅ YANGI
import { ProductCollection } from "../../../lib/enums/product.enum"; // ✅ YANGI: DRINK/DISH aniqlash uchun

/** REDUX SLICE & SELECTOR **/
// ✅ YANGI: STOREdan newDishes ni olib, { newDishes } obyektiga o'raydi
const newDishesRetriever = createSelector(retrieveNewDishes, (newDishes) => ({
  newDishes,
}));
export default function NewDishes() {
  // ✅ YANGI: STOREdan o'qiymiz
  const { newDishes } = useSelector(newDishesRetriever);

  console.log("newDishes:", newDishes);
  return (
    <div className={"new-products-frame"}>
      <Container>
        <Stack className={"main"}>
          <Box className={"category-title"}>Fresh Menu</Box>
          <Stack className={"cards-frame"}>
            <CssVarsProvider>
              {newDishes.length !== 0 ? (
                // ❌ ESKI: newDishes.map((ele, index) => {
                newDishes.map((product: Product) => {
                  // ✅ YANGI: server rasmi manzili
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  // ✅ YANGI: shart ? A : B
                  // ICHIMLIK bo'lsa → hajm litrda ("1l"), aks holda → o'lcham ("NORMAL size")
                  const sizeVolume =
                    product.productCollection === ProductCollection.DRINK
                      ? product.productVolume + "l"
                      : product.productSize + " size";
                  return (
                    // ❌ ESKI: <Card key={index} variant="outlined" className={"card"}>
                    <Card
                      key={product._id} // ✅ YANGI: noyob id
                      variant="outlined"
                      className={"card"}
                    >
                      <CardOverflow>
                        {/* ❌ ESKI: Normal size (qotirilgan) → ✅ YANGI: dinamik */}
                        <div className={"product-sale"}>{sizeVolume}</div>
                        <AspectRatio ratio="1">
                          {/* ❌ ESKI: src={ele.imagePath} → ✅ YANGI: */}
                          <img src={imagePath} alt="" />
                        </AspectRatio>
                      </CardOverflow>

                      <CardOverflow variant="soft" className="product-detail">
                        <Stack className="info">
                          <Stack flexDirection={"row"}>
                            <Typography className={"title"}>
                              {/* ❌ ESKI: {ele.productName} → ✅ YANGI: */}
                              {product.productName}
                            </Typography>
                            <Divider width="2" height="24" bg="#d9d9d9" />
                            <Typography className={"price"}>
                              {/* ❌ ESKI: $12 (qotirilgan) → ✅ YANGI: haqiqiy narx */}
                              ${product.productPrice}
                            </Typography>
                          </Stack>
                          <Stack>
                            <Typography className={"views"}>
                              {/* ❌ ESKI: 20 (qotirilgan) → ✅ YANGI: haqiqiy ko'rishlar */}
                              {product.productViews}
                              <VisibilityIcon
                                sx={{ fontSize: 20, marginLeft: "5px" }}
                              />
                            </Typography>
                          </Stack>
                        </Stack>
                      </CardOverflow>
                    </Card>
                  );
                })
              ) : (
                <Box className="no-data">New products are not available!</Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
