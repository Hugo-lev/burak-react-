import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

// ✅ YANGI izoh — HomePage'dan umumiy ma'lumotlarni tanlaydi
// selector = STOREdan ma'lumot O'QISH vositasi
const selectHomePage = (state: AppRootState) => state.homePage;

// ✅ YANGI izoh — HomePage'dan populyar taomlarni tanlaydi
export const retrievePopularDishes = createSelector(
  selectHomePage,
  (HomePage) => HomePage.popularDishes,
);

// ✅ YANGI izoh — HomePage'dan yangi taomlarni tanlaydi
export const retrieveNewDishes = createSelector(
  selectHomePage,
  (HomePage) => HomePage.newDishes,
);

// ✅ YANGI izoh — HomePage'dan eng yaxshi foydalanuvchilarni tanlaydi
export const retrieveTopUsers = createSelector(
  selectHomePage,
  (HomePage) => HomePage.topUsers,
);
