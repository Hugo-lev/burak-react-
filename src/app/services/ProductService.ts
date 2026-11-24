import axios from "axios";
import { serverApi } from "../../lib/config";
import { Product, ProductInquiry } from "../../lib/types/product";

// Mahsulotlar (taomlar) bo'yicha backend API bilan aloqa qiluvchi servis sinfi
class ProductService {
  // private readonly: faqat shu class ichida o'qilishi mumkin bo'lgan, o'zgarmas o'zgaruvchi
  private readonly path: string;

  constructor() {
    // this.path — shu class obyektiga tegishli 'path' xususiyatiga serverning asosiy URL
    // manzilini (serverApi = "http://localhost:3003") biriktirib qo'yadi.
    // Natijada pastdagi har bir metodda "this.path + '/product/...'" ko'rinishida oson ishlatiladi.
    this.path = serverApi;
  }

  // 1. Filtrlangan va sahifalangan mahsulotlar ro'yxatini olish (order, page, limit, collection, search)
  public async getProducts(input: ProductInquiry): Promise<Product[]> {
    try {
      let url = `${this.path}/product/all?order=${input.order}&page=${input.page}&limit=${input.limit}`;
      if (input.productCollection)
        url += `&productCollection=${input.productCollection}`;
      if (input.search) url += `&search=${input.search}`;

      const result = await axios.get(url);
      console.log("getProducts:", result);

      return result.data;
    } catch (err) {
      console.log("Error, getProduct:", err);
      throw err;
    }
  }

  // 2. Bitta mahsulotni id bo'yicha olish (ChosenProduct sahifasi uchun)
  public async getProduct(productId: string): Promise<Product> {
    try {
      const url = `${this.path}/product/${productId}`;

      // withCredentials: true -> cookie yuboriladi, backend ko'rayotgan foydalanuvchini bilib, ko'rishlar sonini oshiradi
      const result = await axios.get(url, { withCredentials: true });
      console.log("getProduct:", result);

      return result.data;
    } catch (err) {
      console.log("Error, getProduct:", err);
      throw err;
    }
  }
}

export default ProductService;
