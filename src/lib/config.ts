// ✅ YANGI — .env dagi REACT_APP_API_URL qiymatini o'qiydi.
// `${...}` = shablon qator (template literal): qiymatni matn ichiga qo'yadi.
// Natija: "http://localhost:3003"
export const serverApi: string = `${process.env.REACT_APP_API_URL}`;

// ✅ YANGI — Xato xabarlari bir joyda turadi, keyin hamma yerda qayta ishlatiladi.
export const Messages = {
  error1: "Something went wrong!",
  error2: "Please login first!",
  error3: "Please fulfill all inputs!",
  error4: "Message is empty!",
  error5: "Only images with jpeg, jpg, png format allowed!",
};
