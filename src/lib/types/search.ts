// Savatdagi BITTA mahsulot qanday ma'lumotlardan iborat ekanini aytadi
export interface CartItem {
  _id: string;      // mahsulot id'si (takrorni aniqlash uchun)
  quantity: number; // nechta
  name: string;     // nomi
  price: number;    // narxi (1 dona)
  image: string;    // rasm yo'li
}