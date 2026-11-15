import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../lib/types/screen"; // 1-commitdagi tip

// Boshlang'ich holat: hammasi bo'sh ro'yxat
const initialState: HomePageState = {
  popularDishes: [],
  newDishes: [],
  topUsers: [],
};

const homePageSlice = createSlice({
  name: "homePage", // slice nomi
  initialState,
  reducers: {
    // Reducer = xotirani o'zgartiradigan funksiya
    // action.payload = tashqaridan yuborilgan yangi ma'lumot
    setPopularDishes: (state, action) => {
      state.popularDishes = action.payload;
    },
    setNewDishes: (state, action) => {
      state.newDishes = action.payload;
    },
    setTopUsers: (state, action) => {
      state.topUsers = action.payload;
    },
  },
});

// Action'larni tashqariga chiqaramiz (komponentda ishlatish uchun)
export const { setPopularDishes, setNewDishes, setTopUsers } =
  homePageSlice.actions;

// Reducer'ni store'ga ulash uchun eksport qilamiz
const HomePageReducer = homePageSlice.reducer;
export default HomePageReducer;
