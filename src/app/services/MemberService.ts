import axios from "axios"; // ✅
import { serverApi } from "../../lib/config"; // ✅
import { Member } from "../../lib/types/member"; // ✅

// ✅ ProductService bilan bir xil tuzilish, faqat bu yerda userlar bilan ishlaymiz
class MemberService {
  private readonly path: string;

  constructor() {
    this.path = serverApi; // server manzilini eslab qoladi
  }

  // Parametr kerak emas — "eng faol userlarni ber" deyish yetarli
  public async getTopUsers(): Promise<Member[]> {
    try {
      const url = this.path + "/member/top-users"; // http://localhost:3003/member/top-users
      const result = await axios.get(url); // serverga GET so'rov, javobni kutamiz
      console.log("getTopUsers:", result);

      return result.data; // Member lar ro'yxati
    } catch (err) {
      console.log("Error, getTopUsers:", err);
      throw err;
    }
  }
}

export default MemberService;
