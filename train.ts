// Y-Task
function findIntersection<T>(arr1: T[], arr2: T[]): T[] {
  const set2 = new Set(arr2);
  return arr1.filter((item) => set2.has(item));
}

// Misol:
console.log(findIntersection([1, 2, 3], [3, 2, 0])); // [2, 3]

// T = generic tur: array ichida har qanday tur (number, string va h.k.) bo'lishi mumkin
// arr: T[]       = berilgan array
// size: number   = har bir bo'lakning uzunligi
// qaytaradi: T[][] = "array ichida array" (bo'laklar ro'yxati)
// function chunkArray<T>(arr: T[], size: number): T[][] {
//   // Natija saqlanadigan bo'sh array
//   const result: T[][] = [];

//   // i = 0, size, 2*size, ... qadam bilan arrayning boshidan oxirigacha yuramiz
//   for (let i = 0; i < arr.length; i += size) {
//     // slice(boshi, oxiri) = arrayning shu oralig'idagi qismini nusxalab oladi
//     // (oxirgi indeks kiritilmaydi)
//     const chunk = arr.slice(i, i + size);

//     // Olingan bo'lakni natijaga qo'shamiz
//     result.push(chunk);
//   }

//   return result;
// }

// console.log(chunkArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3));
