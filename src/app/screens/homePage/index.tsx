import React, { useEffect } from "react";
import Statistics from "./Statistics";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import "../../../css/home.css";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setPopularDishes } from "./slice";
import { retrievePopularDishes } from "./selector";
import { Product } from "../../../lib/types/product";

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
});

const popularDishesRetriever = createSelector(
  retrievePopularDishes,
  (popularDishes) => ({ popularDishes }),
);

export default function HomePage() {
  const { setPopularDishes } = actionDispatch(useDispatch());
  const { popularDishes } = useSelector(popularDishesRetriever);

  useEffect(() => {}, []);

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
// import { useDispatch, useSelector } from "react-redux";
// import { Dispatch } from "@reduxjs/toolkit";
// import { createSelector } from "reselect";
// import { setPopularDishes } from "./slice";
// import { retrievePopularDishes } from "./selector";
// import { Product } from "../../../lib/types/product";

// /** REDUX SLICE & SELECTOR **/
// const actionDispatch = (dispatch: Dispatch) => ({
//   setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
// });

// export default function HomePage() {
//   const { setPopularDishes } = actionDispatch(useDispatch());
//   // Selector: Store => Data

//   useEffect(() => {
//     // Backend server data request => Data
//     const result = [
//       {
//         _id: "65449af869657f6b1f074f86",
//         productStatus: "PROCESS",
//         productCollection: "DISH",
//         productName: "Cutlet",
//         productPrice: 7,
//         productLeftCount: 20,
//         productSize: "NORMAL",
//         productVolume: 1,
//         productDesc: "This is our special Cutlet.",
//         productImages: [
//           "uploads/products/f93c3c43-864a-4efb-be23-0c8b3c8c43e3.jpeg",
//         ],
//         productViews: 2,
//         createdAt: "2023-11-03T07:02:16.153Z",
//         updatedAt: "2023-11-18T03:11:01.985Z",
//         __v: 0,
//       },
//     ];

//     // Slice: Data => Store
//     // @ts-ignore
//     setPopularDishes(result);
//   }, []);
//   return (
//     <div className={"homepage"}>
//       <Statistics />
//       <PopularDishes />
//       <NewDishes />
//       <Advertisement />
//       <ActiveUsers />
//       <Events />
//     </div>
//   );
// }
