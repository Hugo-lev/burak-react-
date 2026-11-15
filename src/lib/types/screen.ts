import { Member } from "./member";
import { Product } from "./product";

/** REACT APP STATE **/
// Butun ilovaning "umumiy xotirasi" (Redux store) shakli
export interface AppRootState {
  homePage: HomePageState; // har sahifaning o'z bo'limi bor
}

/** HOMEPAGE **/
// Bosh sahifa xotirasida nimalar saqlanadi
export interface HomePageState {
  popularDishes: Product[]; // mashhur taomlar ro'yxati
  newDishes: Product[]; // yangi taomlar ro'yxati
  topUsers: Member[]; // eng faol foydalanuvchilar
}

/** PRODUCTS PAGE **/ // ← bo'sh joy qoldirilgan, keyin to'ldiriladi
/** ORDERS PAGE **/
