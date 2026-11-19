import { createSlice } from "@reduxjs/toolkit";
import { ProductsPageState } from "../../../lib/types/screen";

// Boshlang'ich holat: restoran va tanlangan mahsulot yo'q (null), ro'yxat bo'sh
const initialState: ProductsPageState = {
  restaurant: null,
  chosenProduct: null,
  products: [],
};

// slice = xotiraga ma'lumot YOZISH qoidalari
const productsPageSlice = createSlice({
  name: "productsPage",
  initialState,
  reducers: {
    // action.payload = tashqaridan yuborilgan yangi ma'lumot
    setRestaurant: (state, action) => {
      state.restaurant = action.payload;
    },
    setChosenProduct: (state, action) => {
      state.chosenProduct = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

// Komponentlarda ishlatish uchun action'larni chiqaramiz
export const { setRestaurant, setChosenProduct, setProducts } =
  productsPageSlice.actions;

// store ga ulash uchun reducer
const ProductsPageReducer = productsPageSlice.reducer;
export default ProductsPageReducer;
