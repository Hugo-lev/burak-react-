import React, { useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const products = [
  { productName: "Cutlet", imagePath: "/img/cutlet.webp" },
  { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
  { productName: "Kebab", imagePath: "/img/kebab.webp" },
  { productName: "Lavash", imagePath: "/img/lavash.webp" },
  { productName: "Lavash", imagePath: "/img/lavash.webp" },
  { productName: "Cutlet", imagePath: "/img/cutlet.webp" },
  { productName: "Kebab", imagePath: "/img/kebab.webp" },
  { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
];

const orders = ["New", "Price", "Views"];
const categories = ["Dish", "Salad", "Drink", "Dessert", "Other"];

// Rasm yo'llarini o'zingizdagi fayllarga moslang
const brands = [
  { name: "Gurme", imagePath: "/img/gurme.webp" },
  { name: "Sweets", imagePath: "/img/sweets.webp" },
  { name: "Seafood", imagePath: "/img/seafood.webp" },
  { name: "Doner", imagePath: "/img/doner.webp" },
];

export default function Products() {
  const [order, setOrder] = useState("New");
  const [category, setCategory] = useState("Dish");

  return (
    <div className="products-page">
      <Container>
        <Stack className="products">
          <Stack className="avatar-big-box">
            <Stack className="top-text">
              {orders.map((item) => (
                <Button
                  key={item}
                  variant="contained"
                  className={`order-btn ${order === item ? "active" : ""}`}
                  onClick={() => setOrder(item)}
                >
                  {item}
                </Button>
              ))}
            </Stack>

            <Stack className="list-category-section">
              <Stack className="product-category">
                <div className="category-main">
                  {categories.map((item) => (
                    <Button
                      key={item}
                      variant="contained"
                      className={category === item ? "active" : ""}
                      onClick={() => setCategory(item)}
                    >
                      {item}
                    </Button>
                  ))}
                </div>
              </Stack>

              <Stack className="product-wrapper">
                {products.length !== 0 ? (
                  products.map((product, index) => {
                    return (
                      <Stack key={index} className="product-card">
                        <Stack
                          className="product-img"
                          sx={{ backgroundImage: `url(${product.imagePath})` }}
                        >
                          <div className="product-sale">Normal size</div>
                          <Button className="shop-btn">
                            <img
                              src="/icons/shopping-cart.svg"
                              alt=""
                              style={{ display: "flex" }}
                            />
                          </Button>
                          <Button className="view-btn">
                            <Badge badgeContent={20}>
                              <RemoveRedEyeIcon sx={{ color: "gray" }} />
                            </Badge>
                          </Button>
                        </Stack>
                        <Box className="product-desc">
                          <span className="product-title">
                            {product.productName}
                          </span>
                          <div className="product-price">
                            <MonetizationOnIcon />
                            {12}
                          </div>
                        </Box>
                      </Stack>
                    );
                  })
                ) : (
                  <Box className="no-data">Products are not available!</Box>
                )}
              </Stack>
            </Stack>

            <Stack className="pagination-section">
              <Pagination
                count={3}
                page={1}
                renderItem={(item) => (
                  <PaginationItem
                    components={{
                      previous: ArrowBackIcon,
                      next: ArrowForwardIcon,
                    }}
                    {...item}
                    color="secondary"
                  />
                )}
              />
            </Stack>
          </Stack>
        </Stack>
      </Container>

      <div className="brands-logo">
        <Container>
          <Stack className="brands-area">
            <Box className="category-title">Our Family Brands</Box>
            <Stack className="brands-frame">
              {brands.map((brand) => (
                <div key={brand.name} className="brand-card">
                  <img src={brand.imagePath} alt={brand.name} />
                </div>
              ))}
            </Stack>
          </Stack>
        </Container>
      </div>

      <div className="address">
        <Container>
          <Stack className="address-area">
            <Box className="title">Our address</Box>
            <iframe
              title="Our address"
              style={{ marginTop: "60px" }}
              src="https://maps.google.com/maps?q=%D0%A0%D0%B0%D0%B9%D1%85%D0%BE%D0%BD%20%D0%A2%D0%B0%D1%88%D0%BA%D0%B5%D0%BD%D1%82&output=embed"
              width="1320"
              height="500"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Stack>
        </Container>
      </div>
    </div>
  );
}
