import { Member } from "./member";
import { Product } from "./product";

/** REACT APP STATE **/
export interface AppRootState {
  homePage: HomePageState;
  productsPage: ProductsPageState; //  — Products sahifasining xotira bo'limi
}

/** HOMEPAGE **/
export interface HomePageState {
  popularDishes: Product[];
  newDishes: Product[];
  topUsers: Member[];
}

/** PRODUCTS PAGE **/
// — Products sahifasi xotirasida nimalar saqlanadi
export interface ProductsPageState {
  restaurant: Member | null; // restoran ma'lumoti (yuklanmagan bo'lsa null)
  chosenProduct: Product | null; // tanlangan bitta mahsulot (tanlanmagan bo'lsa null)
  products: Product[]; // ro'yxatdagi mahsulotlar
}

/** ORDERS PAGE **/
