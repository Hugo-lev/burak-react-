import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

// Butun store'dan faqat homePage bo'limini olamiz
const selectHomePage = (state: AppRootState) => state.homePage;

// Undan faqat popularDishes ni ajratib olamiz
export const retrievePopularDishes = createSelector(
  selectHomePage,
  (HomePage) => HomePage.popularDishes,
);
// retrieveNewDishes va retrieveTopUsers ham xuddi shunday yozilgan
