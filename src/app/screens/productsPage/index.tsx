import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ChosenProduct from "./ChosenProduct";
import Products from "./Products";
import "../../../css/prroducts.css";
import { CartItem } from "../../../lib/types/search";

interface ProductsPageProps {
  onAdd: (item: CartItem) => void; // Savatchaga taom qo'shish funksiyasi
}

// Mahsulotlar bo'limining asosiy router komponenti (/products va /products/:productId)
export default function ProductsPage(props: ProductsPageProps) {
  const { onAdd } = props;
  const products = useRouteMatch(); // Joriy URL prefiksini aniqlaydi (masalan: '/products')
  console.log("products:", products);

  return (
    <div className={"products-page"}>
      <Switch>
        {/* /products/:productId -> Bitta aniq taom tafsilotlari sahifasi */}
        <Route path={`${products.path}/:productId`}>
          <ChosenProduct onAdd={onAdd} />
        </Route>
        {/* /products -> Barcha taomlar, qidiruv va filtrlash ro'yxati */}
        <Route path={`${products.path}`}>
          <Products onAdd={onAdd} />
        </Route>
      </Switch>
    </div>
  );
}
