import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import { createSelector } from "reselect";
import { retrieveProducts } from "./selector";
import { Product } from "../../../lib/types/product";
import { ProductCollection } from "../../../lib/enums/product.enum";
import ProductService from "../../services/ProductService";
import { serverApi } from "../../../lib/config";
import { ProductInquiry } from "../../../lib/types/product";
import SearchIcon from "@mui/icons-material/Search";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
const brands = [
  { name: "Gurme", imagePath: "/img/gurme.webp" },
  { name: "Sweets", imagePath: "/img/sweets.webp" },
  { name: "Seafood", imagePath: "/img/seafood.webp" },
  { name: "Doner", imagePath: "/img/doner.webp" },
];
/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));
interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

export default function Products(props: ProductsProps) {
  const { onAdd } = props;
  const [order, setOrder] = useState("New");
  const [category, setCategory] = useState("Dish");
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);
  const [searchText, setSearchText] = useState<string>("");
  const history = useHistory();
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
    productCollection: ProductCollection.DISH,
    search: "",
  });

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, [productSearch]);

  useEffect(() => {
    if (searchText === "") {
      productSearch.search = "";
      setProductSearch({ ...productSearch });
    }
  }, [searchText]);
  /** HANDLERS **/
  const searchCollectionHandler = (collection: ProductCollection) => {
    productSearch.page = 1;
    productSearch.productCollection = collection;
    setProductSearch({ ...productSearch });
  };
  const searchOrderHandler = (order: string) => {
    productSearch.page = 1;
    productSearch.order = order;
    setProductSearch({ ...productSearch });
  };
  const searchProductHandler = () => {
    productSearch.page = 1;
    productSearch.search = searchText;
    setProductSearch({ ...productSearch });
  };
  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductSearch({ ...productSearch });
  };
  const chooseDishHandler = (id: string) => {
    console.log("productId:", id);
    history.push(`/products/${id}`);
  };
  return (
    <div className="products-page">
      <Container>
        <Stack className="products">
          <Stack className="avatar-big-box">
            <Stack className={"top-text"}>
              <p>Burak Restaurant</p>
              <Stack className={"single-search-big-box"}>
                <input
                  type={"search"}
                  className={"single-search-input"}
                  name={"singleResearch"}
                  placeholder={"Type here"}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") searchProductHandler();
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
            <Stack className={"dishes-filter-section"}>
              <Stack className={"dishes-filter-box"}>
                <Button
                  variant={"contained"}
                  className={"order"}
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
                  products.map((product: Product) => {
                    const imagePath = `${serverApi}/${product.productImages[0]}`;
                    const sizeVolume =
                      product.productCollection === ProductCollection.DRINK
                        ? product.productVolume + " litre"
                        : product.productSize + " size";
                    return (
                      <Stack
                        key={product._id}
                        className="product-card"
                        onClick={() => chooseDishHandler(product._id)}
                      >
                        <Stack
                          className="product-img"
                          sx={{ backgroundImage: `url(${imagePath})` }}
                        >
                          <div className="product-sale">{sizeVolume}</div>
                          <Button className="shop-btn">
                            <img
                              src="/icons/shopping-cart.svg"
                              alt=""
                              style={{ display: "flex" }}
                              onClick={(e) => {
                                console.log("BUTTON PRESSED!");
                                onAdd({
                                  _id: product._id,
                                  quantity: 1,
                                  name: product.productName,
                                  price: product.productPrice,
                                  image: product.productImages[0],
                                });
                                e.stopPropagation();
                              }}
                            />
                          </Button>
                          <Button className="view-btn">
                            <Badge
                              badgeContent={product.productViews}
                              color="primary"
                            >
                              <RemoveRedEyeIcon
                                sx={{
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
                count={
                  products.length !== 0
                    ? productSearch.page + 1
                    : productSearch.page
                }
                page={productSearch.page}
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
                onChange={paginationHandler}
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
