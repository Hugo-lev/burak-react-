import axios from "axios"; // ✅ serverga so'rov yuboruvchi kutubxona
import { serverApi } from "../../lib/config"; // ✅ server manzili
import { Product, ProductInquiry } from "../../lib/types/product"; // ✅ TypeScript turlari

// ✅ Service = serverga murojaat qiluvchi kod uchun alohida "ofis".
// Komponent serverga to'g'ridan-to'g'ri bormaydi, shu klass orqali boradi.
class ProductService {
  // private readonly = faqat shu klass ichida ko'rinadi va o'zgartirib bo'lmaydi
  private readonly path: string;

  constructor() {
    // new ProductService() deganda server manzili eslab qolinadi
    this.path = serverApi;
  }

  // async = server javobini "kutadigan" funksiya
  // Promise<Product[]> = "kelajakda Product lar ro'yxatini qaytaraman"
  public async getProducts(input: ProductInquiry): Promise<Product[]> {
    try {
      // 1) URL ni bo'lak-bo'lak yig'amiz (?order=...&page=...&limit=... = query parametrlar)
      //    Masalan: http://localhost:3003/product/all?order=productViews&page=1&limit=4
      let url = `${this.path}/product/all?order=${input.order}&page=${input.page}&limit=${input.limit}`;

      // 2) Ixtiyoriy parametrlar: faqat berilgan bo'lsa URLga qo'shiladi
      if (input.productCollection)
        url += `&productCollection=${input.productCollection}`;
      if (input.search) url += `&search=${input.search}`;

      // 3) Serverga GET so'rov yuboramiz va javobni KUTAMIZ (await)
      const result = await axios.get(url);
      console.log("getProducts:", result); // tekshirish uchun

      // 4) Haqiqiy ma'lumot axios javobining result.data qismida
      return result.data;
    } catch (err) {
      console.log("Error, getProduct:", err);
      throw err; // xatoni yuqoriga uzatamiz, chaqirgan joy .catch() bilan ushlaydi
    }
  }
}

export default ProductService;
