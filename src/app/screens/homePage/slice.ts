// ✅ YANGI izoh — Kerakli modullar va turlarni import qilamiz
import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../lib/types/screen";

// ✅ YANGI izoh — Home page uchun boshlang'ich holat (hammasi bo'sh ro'yxat)
const initialState: HomePageState = {
  popularDishes: [],
  newDishes: [],
  topUsers: [],
};

// ✅ YANGI izoh — Home page state uchun slice yaratamiz
// slice = STOREga ma'lumot YOZISH qoidalari
const homePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    // Mashhur taomlarni saqlash uchun reducer
    // action.payload = tashqaridan yuborilgan yangi ma'lumot
    setPopularDishes: (state, action) => {
      state.popularDishes = action.payload;
    },
    // Yangi taomlarni saqlash uchun reducer
    setNewDishes: (state, action) => {
      state.newDishes = action.payload;
    },
    // Top foydalanuvchilarni saqlash uchun reducer
    setTopUsers: (state, action) => {
      state.topUsers = action.payload;
    },
  },
});

// Action creatorlarni export qilamiz
export const { setPopularDishes, setNewDishes, setTopUsers } =
  homePageSlice.actions;

// Reducer ni export qilamiz
const HomePageReducer = homePageSlice.reducer;
export default HomePageReducer;
