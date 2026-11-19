import React, { useEffect } from "react";
import Statistics from "./Statistics";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
// (css importi eskiden shu yerda edi, endi pastga ko'chirildi — pastdan qara)

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
// ❌ ESKI: import { setPopularDishes } from "./slice";
import { setNewDishes, setPopularDishes, setTopUsers } from "./slice"; // ✅ YANGI: setNewDishes, setTopUsers qo'shildi
// ❌ ESKI: import { retrievePopularDishes } from "./selector";
import { retrievePopularDishes, retrieveTopUsers } from "./selector"; // ✅ YANGI: retrieveTopUsers qo'shildi
import { Product } from "../../../lib/types/product";
import { Member } from "../../../lib/types/member"; // ✅ YANGI: Member turi
import ProductService from "../../services/ProductService"; // ✅ YANGI: taomlar servisi
import { ProductCollection } from "../../../lib/enums/product.enum"; // ✅ YANGI: taom turlari (DISH, DRINK...)
import MemberService from "../../services/MemberService"; // ✅ YANGI: userlar servisi
import "../../../css/home.css"; // (oldin yuqorida edi, o'rni almashdi)

/** REDUX SLICE & SELECTOR **/
// dispatch = STOREga "mana yangi ma'lumot" deb yuboruvchi funksiya
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
  setNewDishes: (data: Product[]) => dispatch(setNewDishes(data)), // ✅ YANGI
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)), // ✅ YANGI
});

const popularDishesRetriever = createSelector(
  retrievePopularDishes,
  (popularDishes) => ({ popularDishes }),
);
// ✅ YANGI: STOREdan topUsers ni o'qish uchun
const topUsersRetriever = createSelector(retrieveTopUsers, (topUsers) => ({
  topUsers,
}));

export default function HomePage() {
  // ❌ ESKI: const { setPopularDishes } = actionDispatch(useDispatch());
  const {
    setPopularDishes,
    setNewDishes,
    setTopUsers, 
  } = // ✅ YANGI: 3 ta funksiya olinadi
    actionDispatch(useDispatch());
  const { popularDishes } = useSelector(popularDishesRetriever);
  const { topUsers } = useSelector(topUsersRetriever); // ✅ YANGI

  // ❌ ESKI: useEffect(() => {}, []);   ← bo'sh edi
  // useEffect + [] = "sahifa BIRINCHI marta chizilganda, faqat BIR marta ishga tush"
  useEffect(() => {
    // ✅ YANGI — Backend server data fetch => Data
    const product = new ProductService(); // servis obyektini yaratamiz

    // 1-so'rov: MASHHUR taomlar (eng ko'p ko'rilgan 4 ta)
    product
      .getProducts({
        page: 1, // 1-sahifa
        limit: 4, // 4 ta taom
        order: "productViews", // ko'rishlar soni bo'yicha tartib
        productCollection: ProductCollection.DISH, // faqat "DISH" turi
      })
      .then((data) => {
        // server javob BERGANDA ishlaydi
        console.log("data passed here:", data);
        setPopularDishes(data); // javobni STOREga yozamiz
      })
      .catch((err) => console.log(err)); // xato bo'lsa konsolga

    // 2-so'rov: YANGI taomlar (eng oxirgi qo'shilgan 4 ta)
    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "createdAt", // yaratilgan vaqt bo'yicha
        productCollection: ProductCollection.DISH,
      })
      .then((data) => setNewDishes(data)) // STOREning newDishes qismiga
      .catch((err) => console.log(err));

    // 3-so'rov: TOP userlar
    const member = new MemberService(); // userlar servisi
    member
      .getTopUsers()
      .then((data) => setTopUsers(data)) // STOREning topUsers qismiga
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={"homepage"}>
      <Statistics />
      <PopularDishes />
      <NewDishes />
      <Advertisement />
      <ActiveUsers />
      <Events />
    </div>
  );
}
