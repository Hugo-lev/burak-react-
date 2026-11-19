// ❌ ESKI: fayl boshida ~25 qator kommentga olingan eski kod bor edi — o'chirildi
// ❌ ESKI: import React, { useState } from "react";
import React, { ChangeEvent, useEffect, useState } from "react"; // ✅ YANGI: ChangeEvent (pagination), useEffect (server so'rovi)
import { Box, Button, Container, Stack } from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useDispatch, useSelector } from "react-redux"; // ✅ YANGI
import { Dispatch } from "@reduxjs/toolkit"; // ✅ YANGI
import { setProducts } from "./slice"; // ✅ YANGI: xotiraga yozish
import { createSelector } from "reselect"; // ✅ YANGI
import { retrieveProducts } from "./selector"; // ✅ YANGI: xotiradan o'qish
import { Product } from "../../../lib/types/product"; // ✅ YANGI
import { ProductCollection } from "../../../lib/enums/product.enum"; // ✅ YANGI: DISH, SALAD, DRINK...
import ProductService from "../../services/ProductService"; // ✅ YANGI: serverga so'rov
import { serverApi } from "../../../lib/config"; // ✅ YANGI: rasm manzili uchun
import { ProductInquiry } from "../../../lib/types/product"; // ✅ YANGI: qidiruv parametrlari turi
import SearchIcon from "@mui/icons-material/Search"; // ✅ YANGI: qidiruv tugmasi ikonkasi
import { useHistory } from "react-router-dom"; // ✅ YANGI: kartani bosganda sahifa almashtirish

// ❌ ESKI: const products = [ { productName: "Cutlet", imagePath: "/img/cutlet.webp" }, ... ]  (soxta 8 ta mahsulot)
// ❌ ESKI: const orders = ["New", "Price", "Views"];
// ❌ ESKI: const categories = ["Dish", "Salad", "Drink", "Dessert", "Other"];

const brands = [
  { name: "Gurme", imagePath: "/img/gurme.webp" },
  { name: "Sweets", imagePath: "/img/sweets.webp" },
  { name: "Seafood", imagePath: "/img/seafood.webp" },
  { name: "Doner", imagePath: "/img/doner.webp" },
];

/** REDUX SLICE & SELECTOR **/
// ✅ YANGI: dispatch = xotiraga "mana yangi ma'lumot" deb yuboruvchi funksiya
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

// ✅ YANGI: xotiradan products ni olib, { products } obyektiga o'raydi
const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

export default function Products() {
  // ⚠️ Bu 2 ta state endi ISHLATILMAYDI (tugmalar productSearch orqali boshqariladi)
  const [order, setOrder] = useState("New");
  const [category, setCategory] = useState("Dish");

  const { setProducts } = actionDispatch(useDispatch()); // ✅ YANGI: xotiraga yozuvchi
  const { products } = useSelector(productsRetriever); // ✅ YANGI: xotiradan o'qiydi (o'zgarsa, komponent qayta chiziladi)

  // ✅ YANGI: input ichida yozilayotgan qidiruv matni
  const [searchText, setSearchText] = useState<string>("");
  const history = useHistory(); // ✅ YANGI: sahifa almashtirish uchun

  // ✅ YANGI: serverga yuboriladigan HAMMA qidiruv parametrlari bitta obyektda
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1, // 1-sahifa
    limit: 2, // bir sahifada 2 ta (⚠️ sinov uchun; avval 8 edi)
    order: "createdAt", // eng yangilari bo'yicha
    productCollection: ProductCollection.DISH, // boshida faqat "Dish"
    search: "", // qidiruv so'zi yo'q
  });

  // ✅ YANGI — 1-useEffect: productSearch O'ZGARGANDA serverdan qayta so'raydi
  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then((data) => setProducts(data)) // javobni xotiraga yozamiz
      .catch((err) => console.log(err));
  }, [productSearch]);

  // ✅ YANGI — 2-useEffect: qidiruv inputi TOZALANGANDA qidiruvni ham tozalaydi
  useEffect(() => {
    if (searchText === "") {
      productSearch.search = "";
      setProductSearch({ ...productSearch });
    }
  }, [searchText]);

  /** HANDLERS **/
  // Har biri: (1) productSearch ni o'zgartiradi, (2) YANGI nusxa qilib qayta yozadi.
  // `{ ...productSearch }` = nusxa. React faqat YANGI obyektni "o'zgardi" deb biladi.

  // Kategoriya tugmasi bosilganda
  const searchCollectionHandler = (collection: ProductCollection) => {
    productSearch.page = 1; // yangi kategoriyada 1-sahifadan
    productSearch.productCollection = collection;
    setProductSearch({ ...productSearch });
  };

  // New / Price / Views tugmasi bosilganda
  const searchOrderHandler = (order: string) => {
    productSearch.page = 1;
    productSearch.order = order; // "createdAt" | "productPrice" | "productViews"
    setProductSearch({ ...productSearch });
  };

  // "Search" tugmasi yoki Enter bosilganda
  const searchProductHandler = () => {
    productSearch.page = 1;
    productSearch.search = searchText; // input ichidagi matn qidiruvga o'tadi
    setProductSearch({ ...productSearch });
  };

  // Sahifa raqami bosilganda (value = bosilgan sahifa raqami)
  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductSearch({ ...productSearch });
  };

  // Karta bosilganda → /products/<id> (ChosenProduct ochiladi)
  const chooseDishHandler = (id: string) => {
    console.log("productId:", id);
    history.push(`/products/${id}`);
  };

  return (
    <div className="products-page">
      <Container>
        <Stack className="products">
          <Stack className="avatar-big-box">
            {/* ❌ ESKI: <Stack className="top-text"> ichida New/Price/Views tugmalari (orders.map) bor edi */}
            {/* ✅ YANGI: top-text endi sarlavha + qidiruv */}
            <Stack className={"top-text"}>
              <p>Burak Restaurant</p>
              <Stack className={"single-search-big-box"}>
                <input
                  type={"search"}
                  className={"single-search-input"}
                  name={"singleResearch"}
                  placeholder={"Type here"}
                  value={searchText} // input qiymati state bilan bog'langan
                  onChange={(e) => setSearchText(e.target.value)} // har harfda state yangilanadi
                  onKeyDown={(e) => {
                    if (e.key === "Enter") searchProductHandler(); // Enter → qidiradi
                  }}
                />
                <Button
                  className={"single-button-search"}
                  variant="contained"
                  endIcon={<SearchIcon />}
                  onClick={searchProductHandler}
                >
                  Search
                </Button>
              </Stack>
            </Stack>

            {/* ✅ YANGI: New / Price / Views tugmalari alohida bo'limda */}
            <Stack className={"dishes-filter-section"}>
              <Stack className={"dishes-filter-box"}>
                <Button
                  variant={"contained"}
                  className={"order"}
                  // tanlangan tugma "primary" (to'q), qolganlari "secondary"
                  color={
                    productSearch.order === "createdAt"
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() => searchOrderHandler("createdAt")}
                >
                  New
                </Button>
                <Button
                  variant={"contained"}
                  className={"order"}
                  color={
                    productSearch.order === "productPrice"
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() => searchOrderHandler("productPrice")}
                >
                  Price
                </Button>
                <Button
                  variant={"contained"}
                  className={"order"}
                  color={
                    productSearch.order === "productViews"
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() => searchOrderHandler("productViews")}
                >
                  Views
                </Button>
              </Stack>
            </Stack>

            <Stack className={"list-category-section"}>
              <Stack className={"product-category"}>
                <div className={"category-main"}>
                  {/* ❌ ESKI: categories.map(...) → ✅ YANGI: har bir kategoriya alohida tugma */}
                  <Button
                    variant={"contained"}
                    color={
                      productSearch.productCollection ===
                      ProductCollection.OTHER
                        ? "primary"
                        : "secondary"
                    }
                    onClick={() =>
                      searchCollectionHandler(ProductCollection.OTHER)
                    }
                  >
                    Other
                  </Button>
                  <Button
                    variant={"contained"}
                    color={
                      productSearch.productCollection ===
                      ProductCollection.DESSERT
                        ? "primary"
                        : "secondary"
                    }
                    onClick={() =>
                      searchCollectionHandler(ProductCollection.DESSERT)
                    }
                  >
                    Dessert
                  </Button>
                  <Button
                    variant={"contained"}
                    color={
                      productSearch.productCollection ===
                      ProductCollection.DRINK
                        ? "primary"
                        : "secondary"
                    }
                    onClick={() =>
                      searchCollectionHandler(ProductCollection.DRINK)
                    }
                  >
                    Drink
                  </Button>
                  <Button
                    variant={"contained"}
                    color={
                      productSearch.productCollection ===
                      ProductCollection.SALAD
                        ? "primary"
                        : "secondary"
                    }
                    onClick={() =>
                      searchCollectionHandler(ProductCollection.SALAD)
                    }
                  >
                    Salad
                  </Button>
                  <Button
                    variant={"contained"}
                    color={
                      productSearch.productCollection === ProductCollection.DISH
                        ? "primary"
                        : "secondary"
                    }
                    onClick={() =>
                      searchCollectionHandler(ProductCollection.DISH)
                    }
                  >
                    Dish
                  </Button>
                </div>
              </Stack>

              <Stack className="product-wrapper">
                {products.length !== 0 ? (
                  // ❌ ESKI: products.map((product, index) => {   (soxta ro'yxat)
                  products.map((product: Product) => {
                    // ✅ YANGI: rasm manzili = server manzili + serverdagi yo'l
                    const imagePath = `${serverApi}/${product.productImages[0]}`;
                    // ✅ YANGI: ichimlik bo'lsa hajm ("1 litre"), aks holda o'lcham ("NORMAL size")
                    const sizeVolume =
                      product.productCollection === ProductCollection.DRINK
                        ? product.productVolume + " litre"
                        : product.productSize + " size";
                    return (
                      <Stack
                        key={product._id} // ❌ ESKI: key={index} → ✅ noyob id
                        className="product-card"
                        onClick={() => chooseDishHandler(product._id)} // ✅ YANGI: bossa, tafsilot ochiladi
                      >
                        <Stack
                          className="product-img"
                          // ❌ ESKI: url(${product.imagePath}) → ✅ YANGI: serverdan kelgan rasm
                          sx={{ backgroundImage: `url(${imagePath})` }}
                        >
                          {/* ❌ ESKI: Normal size (qotirilgan) → ✅ YANGI: dinamik */}
                          <div className="product-sale">{sizeVolume}</div>
                          <Button className="shop-btn">
                            <img
                              src="/icons/shopping-cart.svg"
                              alt=""
                              style={{ display: "flex" }}
                            />
                          </Button>
                          <Button className="view-btn">
                            {/* ❌ ESKI: <Badge badgeContent={20}> → ✅ YANGI: haqiqiy ko'rishlar */}
                            <Badge
                              badgeContent={product.productViews}
                              color="primary"
                            >
                              <RemoveRedEyeIcon
                                sx={{
                                  // ✅ YANGI: 0 ko'rilgan bo'lsa kulrang, aks holda oq
                                  color:
                                    product.productViews === 0
                                      ? "gray"
                                      : "white",
                                }}
                              />
                            </Badge>
                          </Button>
                        </Stack>
                        <Box className="product-desc">
                          <span className="product-title">
                            {product.productName}
                          </span>
                          <div className="product-price">
                            <MonetizationOnIcon />
                            {/* ❌ ESKI: {12} → ✅ YANGI: narx, 2 xona kasr bilan (7 → "7.00") */}
                            {product.productPrice.toFixed(2)} $
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

            <Stack className={"pagination-section"}>
              <Pagination
                // ❌ ESKI: count={3} page={1} (qotirilgan)
                // ✅ YANGI: backend jami sonini bermaydi, shuning uchun "hiyla":
                // shu sahifada mahsulot bor → keyingi sahifa ham bor deb hisoblaymiz (page + 1)
                count={
                  products.length !== 0
                    ? productSearch.page + 1
                    : productSearch.page
                }
                page={productSearch.page} // hozirgi sahifa
                renderItem={(item) => (
                  <PaginationItem
                    components={{
                      previous: ArrowBackIcon,
                      next: ArrowForwardIcon,
                    }}
                    {...item}
                    color={"secondary"}
                  />
                )}
                onChange={paginationHandler} // ✅ YANGI: sahifa bosilganda ishlaydi
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
