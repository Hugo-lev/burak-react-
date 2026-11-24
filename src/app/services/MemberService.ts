import axios from "axios";
import { serverApi } from "../../lib/config";
import { LoginInput, Member, MemberInput } from "../../lib/types/member";

// Foydalanuvchilar va restoran bo'yicha backend API bilan aloqa qiluvchi servis sinfi
class MemberService {
  // private readonly: faqat shu class ichida o'qilishi mumkin bo'lgan, o'zgarmas o'zgaruvchi
  private readonly path: string;

  constructor() {
    // this.path — shu class obyektiga tegishli 'path' xususiyatiga serverning asosiy URL
    // manzilini (serverApi = "http://localhost:3003") biriktirib qo'yadi.
    // Natijada pastdagi har bir metodda "this.path + '/member/...'" ko'rinishida oson ishlatiladi.
    this.path = serverApi;
  }

  // 1. Eng faol foydalanuvchilar (Top Users) ro'yxatini olish
  public async getTopUsers(): Promise<Member[]> {
    try {
      const url = this.path + "/member/top-users";
      const result = await axios.get(url);
      console.log("getTopUsers:", result);

      return result.data;
    } catch (err) {
      console.log("Error, getTopUsers:", err);
      throw err;
    }
  }

  // 2. Restoran (Burak egasi/ma'muri) ma'lumotlarini olish
  public async getRestaurant(): Promise<Member> {
    try {
      const url = this.path + "/member/restaurant";
      const result = await axios.get(url);
      console.log("getRestaurant:", result);

      const restaurant: Member = result.data;
      return restaurant;
    } catch (err) {
      console.log("Error, getRestaurant:", err);
      throw err;
    }
  }

  // 3. Yangi foydalanuvchini ro'yxatdan o'tkazish (Signup)
  public async signup(input: MemberInput): Promise<Member> {
    try {
      const url = this.path + "/member/signup";
      // withCredentials: true -> backend yuborgan HTTP-only cookie (token) brauzerda avtomatik saqlanadi
      const result = await axios.post(url, input, { withCredentials: true });
      console.log("signup:", result);

      const member: Member = result.data.member;
      // Foydalanuvchi ma'lumotlarini brauzer xotirasida saqlaymiz
      localStorage.setItem("memberData", JSON.stringify(member));
      return member;
    } catch (err) {
      console.log("Error, signup:", err);
      throw err;
    }
  }

  // 4. Tizimga kirish (Login)
  public async login(input: LoginInput): Promise<Member> {
    try {
      const url = this.path + "/member/login";
      // withCredentials: true -> avtorizatsiya cookie'sini qabul qilish uchun
      const result = await axios.post(url, input, { withCredentials: true });
      console.log("login:", result);

      const member: Member = result.data.member;
      // Muvaffaqiyatli kirganda ma'lumotlarni localStorage'ga saqlash
      localStorage.setItem("memberData", JSON.stringify(member));
      return member;
    } catch (err) {
      console.log("Error, login:", err);
      throw err;
    }
  }

  // 5. Tizimdan chiqish (Logout)
  public async logout(): Promise<void> {
    try {
      const url = this.path + "/member/logout";
      // Backend qaysi user chiqayotganini cookie'dagi token orqali aniqlaydi va tokenni tozalaydi
      const result = await axios.post(url, {}, { withCredentials: true });
      console.log("logout:", result);

      // Brauzerdagi user ma'lumotlarini tozalaymiz
      localStorage.removeItem("memberData");
    } catch (err) {
      console.log("Error, logout:", err);
      throw err;
    }
  }
}

export default MemberService;
