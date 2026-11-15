import { MemberStatus, MemberType } from "../enums/member.enum";

// Backenddan keladigan TO'LIQ foydalanuvchi
export interface Member {
  _id: string; // MongoDB ID
  memberType: MemberType; // yuqoridagi enum
  memberStatus: MemberStatus;
  memberNick: string; // nik
  memberPhone: string;
  memberPassword?: string; // "?" = ixtiyoriy (bo'lmasligi ham mumkin)
  memberAddress?: string;
  memberDesc?: string;
  memberImage?: string;
  memberPoints: number;
  createdAt: Date;
  updatedAt: Date;
}

// Ro'yxatdan o'tishda (signup) yuboriladigan ma'lumot
export interface MemberInput {
  memberNick: string; // majburiy
  memberPhone: string; // majburiy
  memberPassword: string; // majburiy
  memberType?: MemberType; // ixtiyoriy
  // ...qolganlari ixtiyoriy
}

// Kirishda (login) faqat 2 ta narsa kerak
export interface LoginInput {
  memberNick: string;
  memberPassword: string;
}

// Profilni yangilashda hammasi ixtiyoriy
export interface MemberUpdateInput {
  /* hammasi "?" bilan */
}
