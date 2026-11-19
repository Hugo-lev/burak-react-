import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

// Xotiradan butun productsPage bo'limini oladi
const selectProductsPage = (state: AppRootState) => state.productsPage;

// selector = xotiradan ma'lumot O'QISH vositasi (har biri bitta maydonni oladi)
export const retrieveRestaurant = createSelector(
  selectProductsPage,
  (ProductsPage) => ProductsPage.restaurant,
);

export const retrieveChosenProduct = createSelector(
  selectProductsPage,
  (ProductsPage) => ProductsPage.chosenProduct,
);

export const retrieveProducts = createSelector(
  selectProductsPage,
  (ProductsPage) => ProductsPage.products,
);
