// ❌ ESKI: import React from "react";
import React, { useEffect } from "react"; // ✅ YANGI: useEffect (serverdan olish uchun)
import { Container, Stack, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Divider from "../../components/divider";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { useDispatch, useSelector } from "react-redux"; // ✅ YANGI
import { Dispatch } from "@reduxjs/toolkit"; // ✅ YANGI
import { setRestaurant, setChosenProduct } from "./slice"; // ✅ YANGI: xotiraga yozish
import { createSelector } from "reselect"; // ✅ YANGI
import { retrieveChosenProduct, retrieveRestaurant } from "./selector"; // ✅ YANGI: xotiradan o'qish
import { Product } from "../../../lib/types/product"; // ✅ YANGI
import { Member } from "../../../lib/types/member"; // ✅ YANGI
import { useParams } from "react-router-dom"; // ✅ YANGI: URL dagi :productId ni olish
import MemberService from "../../services/MemberService"; // ✅ YANGI
import ProductService from "../../services/ProductService"; // ✅ YANGI
import { serverApi } from "../../../lib/config"; // ✅ YANGI: rasm manzili uchun

/** REDUX SLICE & SELECTOR **/
// ✅ YANGI: xotiraga yozuvchi funksiyalar
const actionDispatch = (dispatch: Dispatch) => ({
  setRestaurant: (data: Member) => dispatch(setRestaurant(data)),
  setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
});

// ✅ YANGI: xotiradan o'qiydigan selector'lar
const chosenProductRetriever = createSelector(
  retrieveChosenProduct,
  (chosenProduct) => ({
    chosenProduct,
  }),
);

const restaurantRetriever = createSelector(
  retrieveRestaurant,
  (restaurant) => ({
    restaurant,
  }),
);

export default function ChosenProduct() {
  // ✅ YANGI: URL "/products/65449af8..." bo'lsa, productId = "65449af8..."
  // (nomi index.tsx dagi ":productId" bilan aynan bir xil bo'lishi shart)
  const { productId } = useParams<{ productId: string }>();
  const { setRestaurant, setChosenProduct } = actionDispatch(useDispatch());
  const { chosenProduct } = useSelector(chosenProductRetriever);
  const { restaurant } = useSelector(restaurantRetriever);

  console.log("productId:", productId);

  // ✅ YANGI: sahifa ochilganda 2 ta so'rov yuboriladi
  useEffect(() => {
    const product = new ProductService();
    product
      .getProduct(productId) // tanlangan mahsulot
      .then((data) => setChosenProduct(data))
      .catch((err) => console.log(err));

    const member = new MemberService();
    member
      .getRestaurant() // restoran nomi va telefoni
      .then((data) => setRestaurant(data))
      .catch((err) => console.log(err));
  }, []);

  // ✅ YANGI: ma'lumot hali kelmagan bo'lsa (null), hech narsa chizmaymiz.
  // Busiz chosenProduct.productName da "null'ning xususiyati o'qilmaydi" xatosi chiqardi.
  if (!chosenProduct) return null;

  return (
    <div className={"chosen-product"}>
      <Box className={"title"}>Product Detail</Box>
      <Container className={"product-container"}>
        <Stack className={"chosen-product-slider"}>
          <Swiper
            loop={true}
            spaceBetween={10}
            navigation={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="swiper-area"
          >
            {/* ❌ ESKI: {["/img/cutlet.webp", "/img/kebab-fresh.webp"].map(...)}  (2 ta qotirilgan rasm) */}
            {/* ✅ YANGI: mahsulotning HAMMA rasmlari (?. = null bo'lsa xato bermaydi) */}
            {chosenProduct?.productImages?.map((ele: string, index: number) => {
              const imagePath = `${serverApi}/${ele}`;
              return (
                <SwiperSlide key={index}>
                  <img className="slider-image" src={imagePath} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Stack>
        <Stack className={"chosen-product-info"}>
          <Box className={"info-box"}>
            <strong className={"product-name"}>
              {/* ❌ ESKI: Kebab (qotirilgan) → ✅ YANGI: */}
              {chosenProduct?.productName}
            </strong>
            {/* ❌ ESKI: <span className={"resto-name"}>Burak</span> */}
            {/* ✅ YANGI: haqiqiy restoran nomi va telefoni */}
            <span className={"resto-name"}>{restaurant?.memberNick}</span>
            <span className={"resto-name"}>{restaurant?.memberPhone}</span>
            <Box className={"rating-box"}>
              <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
              <div className={"evaluation-box"}>
                <div className={"product-view"}>
                  <RemoveRedEyeIcon sx={{ mr: "10px" }} />
                  {/* ❌ ESKI: 20 → ✅ YANGI: haqiqiy ko'rishlar soni */}
                  <span>{chosenProduct?.productViews}</span>
                </div>
              </div>
            </Box>
            {/* ❌ ESKI: Our best product → ✅ YANGI: */}
            <p className={"product-desc"}>{chosenProduct?.productDesc}</p>
            <Divider height="1" width="100%" bg="#000000" />
            <div className={"product-price"}>
              <span>Price:</span>
              {/* ❌ ESKI: $12 → ✅ YANGI: haqiqiy narx, 2 xona kasr bilan */}
              <span>${chosenProduct?.productPrice?.toFixed(2)}</span>
            </div>
            <div className={"button-box"}>
              <Button variant="contained">Add To Basket</Button>
            </div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
