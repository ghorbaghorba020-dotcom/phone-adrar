// DEMO DATA ONLY — fictional shops, prices, stats and contacts for the prototype.
// Replace with real shop-entered data from the backend later; keep these shapes.
import apple from "@/assets/phone-apple.jpg";
import samsung from "@/assets/phone-samsung.jpg";
import xiaomi from "@/assets/phone-xiaomi.jpg";
import other from "@/assets/phone-other.jpg";

export const WILAYA = { slug: "adrar", name: "أدرار" };
export const BRAND_NAME = { en: "Phone Adrar", ar: "هواتف أدرار", tagline: "قارن قبل ما تشري", tagline2: "كل هواتف أدرار في مكان واحد" };

export type Brand = { slug: string; name: string; series: string[] };
export const BRANDS: Brand[] = [
  { slug: "apple", name: "Apple", series: ["iPhone", "iPhone Pro", "iPhone Pro Max"] },
  { slug: "samsung", name: "Samsung", series: ["Galaxy A", "Galaxy S"] },
  { slug: "xiaomi", name: "Xiaomi", series: ["Xiaomi", "Xiaomi Ultra"] },
  { slug: "redmi", name: "Redmi", series: ["Redmi Note"] },
  { slug: "realme", name: "Realme", series: ["GT", "Number"] },
  { slug: "oppo", name: "Oppo", series: ["Reno"] },
  { slug: "honor", name: "Honor", series: ["Honor"] },
  { slug: "infinix", name: "Infinix", series: ["GT", "Note"] },
  { slug: "tecno", name: "Tecno", series: ["Camon", "Spark"] },
  { slug: "oneplus", name: "OnePlus", series: ["OnePlus"] },
];

export type Shop = {
  slug: string;
  name: string;
  tagline: string;
  address: string;
  wilaya: string;
  phone: string;
  whatsapp: string;
  hours: string;
  verified: boolean;
  rating: number;
  reviews: number;
  mapQuery: string;
};

// Fictional shops. Phone/WhatsApp numbers are placeholders, never real.
export const SHOPS: Shop[] = [
  { slug: "adrar-mobile", name: "Adrar Mobile", tagline: "هواتف ذكية وإكسسوارات", address: "وسط المدينة", wilaya: "adrar", phone: "0000000001", whatsapp: "213000000001", hours: "09:00 – 20:00", verified: true, rating: 4.8, reviews: 126, mapQuery: "Adrar Algeria" },
  { slug: "sahara-phone", name: "Sahara Phone", tagline: "أحدث الهواتف بأسعار تنافسية", address: "شارع الاستقلال", wilaya: "adrar", phone: "0000000002", whatsapp: "213000000002", hours: "08:30 – 21:00", verified: true, rating: 4.7, reviews: 98, mapQuery: "Adrar Algeria" },
  { slug: "adrar-smart", name: "Adrar Smart", tagline: "آيفون وسامسونغ بضمان", address: "حي النصر", wilaya: "adrar", phone: "0000000003", whatsapp: "213000000003", hours: "09:00 – 19:30", verified: true, rating: 4.9, reviews: 154, mapQuery: "Adrar Algeria" },
  { slug: "el-bahja-mobile", name: "El Bahja Mobile", tagline: "هواتف وصيانة", address: "سوق المدينة", wilaya: "adrar", phone: "0000000004", whatsapp: "213000000004", hours: "10:00 – 20:00", verified: false, rating: 4.5, reviews: 61, mapQuery: "Adrar Algeria" },
  { slug: "mobile-center-adrar", name: "Mobile Center Adrar", tagline: "تشكيلة واسعة لكل الميزانيات", address: "طريق رقان", wilaya: "adrar", phone: "0000000005", whatsapp: "213000000005", hours: "09:00 – 21:00", verified: true, rating: 4.6, reviews: 83, mapQuery: "Adrar Algeria" },
  { slug: "phone-house-adrar", name: "Phone House Adrar", tagline: "هواتف جديدة ومستعملة", address: "حي بني وسكت", wilaya: "adrar", phone: "0000000006", whatsapp: "213000000006", hours: "08:00 – 20:00", verified: true, rating: 4.4, reviews: 47, mapQuery: "Adrar Algeria" },
  { slug: "smart-zone", name: "Smart Zone", tagline: "شاومي وريدمي بأفضل سعر", address: "شارع أول نوفمبر", wilaya: "adrar", phone: "0000000007", whatsapp: "213000000007", hours: "09:30 – 20:30", verified: false, rating: 4.6, reviews: 72, mapQuery: "Adrar Algeria" },
  { slug: "techno-mobile", name: "Techno Mobile", tagline: "هواتف الألعاب والأداء", address: "حي 400 مسكن", wilaya: "adrar", phone: "0000000008", whatsapp: "213000000008", hours: "10:00 – 22:00", verified: true, rating: 4.7, reviews: 89, mapQuery: "Adrar Algeria" },
];

export type Listing = {
  shop: string;
  price: number;
  oldPrice?: number;
  inStock: boolean;
  condition: "new" | "used";
  updatedHoursAgo: number;
  history: { date: string; price: number }[];
};

export type Phone = {
  slug: string;
  brand: string;
  model: string;
  series: string;
  image: string;
  ram: number;
  storage: number;
  is5g: boolean;
  colors: string[];
  screen: string;
  processor: string;
  camera: string;
  battery: string;
  os: string;
  description: string;
  addedDaysAgo: number;
  views: number;
  listings: Listing[];
};

const IMG: Record<string, string> = { apple, samsung, xiaomi, redmi: xiaomi };

// [slug, brand, model, series, ram, storage, price, oldPrice, 5g, screen, cpu, camera, battery, os, description]
type Row = [string, string, string, string, number, number, number, number | 0, boolean, string, string, string, string, string, string];
const ROWS: Row[] = [
  ["iphone-17-pro-max", "apple", "iPhone 17 Pro Max", "iPhone Pro Max", 12, 256, 289000, 299000, true, "6.9″ OLED 120Hz", "A19 Pro", "48MP + 48MP + 48MP", "4800 mAh", "iOS 26", "أقوى آيفون بشاشة كبيرة وكاميرات احترافية."],
  ["iphone-17-pro", "apple", "iPhone 17 Pro", "iPhone Pro", 12, 256, 249000, 0, true, "6.3″ OLED 120Hz", "A19 Pro", "48MP + 48MP + 48MP", "3900 mAh", "iOS 26", "أداء احترافي بحجم مريح."],
  ["iphone-17", "apple", "iPhone 17", "iPhone", 8, 256, 189000, 195000, true, "6.3″ OLED 120Hz", "A19", "48MP + 48MP", "3700 mAh", "iOS 26", "الآيفون الأساسي بشاشة 120Hz لأول مرة."],
  ["iphone-16-pro-max", "apple", "iPhone 16 Pro Max", "iPhone Pro Max", 8, 256, 225000, 240000, true, "6.9″ OLED 120Hz", "A18 Pro", "48MP + 48MP + 12MP", "4685 mAh", "iOS 26", "خيار رائد بسعر أقل من الجيل الجديد."],
  ["iphone-15", "apple", "iPhone 15", "iPhone", 6, 128, 129000, 0, true, "6.1″ OLED", "A16 Bionic", "48MP + 12MP", "3349 mAh", "iOS 26", "آيفون موثوق بسعر معقول."],
  ["galaxy-s26-ultra", "samsung", "Galaxy S26 Ultra", "Galaxy S", 12, 256, 249000, 265000, true, "6.9″ Dynamic AMOLED 120Hz", "Snapdragon 8 Elite Gen 5", "200MP + 50MP + 50MP + 10MP", "5000 mAh", "Android 16", "قلم S Pen وكاميرا 200MP وذكاء اصطناعي."],
  ["galaxy-s26-plus", "samsung", "Galaxy S26+", "Galaxy S", 12, 256, 189000, 0, true, "6.7″ Dynamic AMOLED 120Hz", "Exynos 2600", "50MP + 12MP + 10MP", "4900 mAh", "Android 16", "شاشة كبيرة وأداء رائد."],
  ["galaxy-s25-fe", "samsung", "Galaxy S25 FE", "Galaxy S", 8, 256, 119000, 126000, true, "6.7″ Dynamic AMOLED 120Hz", "Exynos 2400", "50MP + 12MP + 8MP", "4900 mAh", "Android 16", "تجربة Galaxy S بسعر أخف."],
  ["galaxy-a57", "samsung", "Galaxy A57 5G", "Galaxy A", 8, 256, 82000, 86000, true, "6.7″ Super AMOLED 120Hz", "Exynos 1680", "50MP + 12MP + 5MP", "5000 mAh", "Android 16", "أفضل هاتف متوسط من سامسونغ."],
  ["galaxy-a37", "samsung", "Galaxy A37 5G", "Galaxy A", 8, 128, 62000, 0, true, "6.7″ Super AMOLED 120Hz", "Exynos 1580", "50MP + 8MP + 5MP", "5000 mAh", "Android 16", "متوسط متوازن للاستخدام اليومي."],
  ["xiaomi-15-ultra", "xiaomi", "Xiaomi 15 Ultra", "Xiaomi Ultra", 16, 512, 179000, 189000, true, "6.73″ AMOLED 120Hz", "Snapdragon 8 Elite", "50MP Leica ×4", "5410 mAh", "HyperOS 2", "كاميرا Leica احترافية."],
  ["xiaomi-15-pro", "xiaomi", "Xiaomi 15 Pro", "Xiaomi", 12, 256, 145000, 0, true, "6.73″ AMOLED 120Hz", "Snapdragon 8 Elite", "50MP + 50MP + 50MP", "6100 mAh", "HyperOS 2", "بطارية ضخمة وأداء عالٍ."],
  ["redmi-note-15-pro-plus", "redmi", "Redmi Note 15 Pro+", "Redmi Note", 12, 256, 74500, 79000, true, "6.83″ AMOLED 120Hz", "Snapdragon 7s Gen 4", "200MP + 8MP + 2MP", "6500 mAh", "HyperOS 3", "قيمة ممتازة مع شحن 120W."],
  ["redmi-note-15-pro", "redmi", "Redmi Note 15 Pro", "Redmi Note", 12, 512, 81000, 0, true, "6.83″ AMOLED 120Hz", "Dimensity 7400 Ultra", "200MP + 8MP", "6500 mAh", "HyperOS 3", "سعة 512GB بسعر متوسط."],
  ["redmi-note-15", "redmi", "Redmi Note 15", "Redmi Note", 8, 256, 46000, 49000, false, "6.77″ AMOLED 120Hz", "Helio G100 Ultra", "108MP + 2MP", "5800 mAh", "HyperOS 3", "اقتصادي بمواصفات قوية."],
  ["realme-gt-7", "realme", "Realme GT 7", "GT", 12, 256, 91000, 96000, true, "6.78″ AMOLED 144Hz", "Dimensity 9400+", "50MP + 8MP", "7000 mAh", "Realme UI 6", "أداء رائد وبطارية 7000mAh."],
  ["realme-14-pro-plus", "realme", "Realme 14 Pro+", "Number", 12, 256, 69000, 0, true, "6.83″ AMOLED 120Hz", "Snapdragon 7s Gen 3", "50MP + 50MP + 8MP", "6000 mAh", "Realme UI 6", "تصميم مميز وكاميرا تقريب."],
  ["honor-400-pro", "honor", "Honor 400 Pro", "Honor", 12, 512, 88000, 94000, true, "6.7″ AMOLED 120Hz", "Snapdragon 8 Gen 3", "200MP + 50MP + 12MP", "5300 mAh", "MagicOS 9", "كاميرا 200MP بسعر جيد."],
  ["oppo-reno-14-pro", "oppo", "Oppo Reno 14 Pro", "Reno", 12, 512, 105000, 0, true, "6.83″ AMOLED 120Hz", "Dimensity 8450", "50MP ×3", "6200 mAh", "ColorOS 15", "نحيف وأنيق بكاميرات بورتريه."],
  ["infinix-gt-30-pro", "infinix", "Infinix GT 30 Pro", "GT", 12, 256, 58000, 62000, true, "6.78″ AMOLED 144Hz", "Dimensity 8350", "108MP + 8MP", "5500 mAh", "XOS 15", "هاتف ألعاب بسعر مناسب."],
  ["tecno-camon-40-pro", "tecno", "Tecno Camon 40 Pro", "Camon", 8, 256, 52000, 0, true, "6.78″ AMOLED 144Hz", "Dimensity 7300", "50MP + 8MP", "5200 mAh", "HiOS 15", "كاميرا أمامية 50MP للسيلفي."],
  ["oneplus-13", "oneplus", "OnePlus 13", "OnePlus", 12, 256, 155000, 165000, true, "6.82″ AMOLED 120Hz", "Snapdragon 8 Elite", "50MP Hasselblad ×3", "6000 mAh", "OxygenOS 15", "سريع جدًا بشحن 100W."],
];

const DATES = ["05/09", "12/09", "19/09", "26/09", "01/10", "02/10"];
const HOURS = [2, 4, 26, 1, 6, 3, 30, 9, 12, 5, 48, 7];
const r = (n: number) => Math.round(n / 500) * 500;

function buildListings(row: Row, i: number): Listing[] {
  const [, , , , , , price, oldPrice] = row;
  const count = 2 + (i % 3) + (i % 2); // 2–5 shops
  return Array.from({ length: count }, (_, k) => {
    const shop = SHOPS[(i * 3 + k * 3) % SHOPS.length]!;
    const p = k === 0 ? price : r(price * (1 + ((k * 7 + i) % 5) * 0.008 + (k % 2 ? -0.004 : 0.006)));
    const start = k === 0 && oldPrice ? oldPrice : r(p * (1 + ((i + k) % 3) * 0.015));
    const history = DATES.map((date, d) => ({ date, price: d === DATES.length - 1 ? p : r(start - ((start - p) * d) / (DATES.length - 1)) }));
    return {
      shop: shop.slug,
      price: p,
      ...(k === 0 && oldPrice ? { oldPrice } : {}),
      inStock: !(k === 3 && i % 2 === 0),
      condition: "new" as const,
      updatedHoursAgo: HOURS[(i + k * 5) % HOURS.length]!,
      history,
    };
  });
}

export const PHONES: Phone[] = ROWS.map((row, i) => {
  const [slug, brand, model, series, ram, storage, , , is5g, screen, processor, camera, battery, os, description] = row;
  return {
    slug, brand, model, series, ram, storage, is5g, screen, processor, camera, battery, os, description,
    image: IMG[brand] ?? other,
    colors: ["أسود", "أبيض", "أزرق"].slice(0, 2 + (i % 2)),
    addedDaysAgo: (i * 3) % 17,
    views: 900 - ((i * 137) % 700),
    listings: buildListings(row, i),
  };
});

// Fictional platform statistics — never present as real.
export const DEMO_STATS = [
  { value: "+250", label: "منتج تجريبي" },
  { value: "+8", label: "محلات تجريبية" },
  { value: "+1,500", label: "مقارنة تجريبية" },
  { value: "+8,000", label: "زيارة تجريبية" },
];

export const brandOf = (slug: string) => BRANDS.find((b) => b.slug === slug);
export const shopOf = (slug: string) => SHOPS.find((s) => s.slug === slug);
export const phoneOf = (brand: string, slug: string) => PHONES.find((p) => p.brand === brand && p.slug === slug);
export const bestListing = (p: Phone) => {
  const inStock = p.listings.filter((l) => l.inStock);
  const pool = inStock.length ? inStock : p.listings;
  return pool.reduce((a, b) => (b.price < a.price ? b : a));
};
export const lastUpdated = (p: Phone) => Math.min(...p.listings.map((l) => l.updatedHoursAgo));
export const phonesOfShop = (shop: string) => PHONES.filter((p) => p.listings.some((l) => l.shop === shop));
export const listingOf = (p: Phone, shop: string) => p.listings.find((l) => l.shop === shop);
export const hasDrop = (p: Phone) => p.listings.some((l) => (l.history[0]?.price ?? 0) > l.price);
export const discountOf = (l: Listing) => (l.oldPrice ? Math.round((1 - l.price / l.oldPrice) * 100) : 0);
export const isStale = (hours: number) => hours >= 24;

export const formatDZD = (n: number) => n.toLocaleString("en-US") + " دج";
export const ago = (hours: number) =>
  hours < 1 ? "الآن" : hours === 1 ? "منذ ساعة" : hours === 2 ? "منذ ساعتين" : hours < 24 ? `منذ ${hours} ساعات` : hours < 48 ? "منذ يوم" : hours < 72 ? "منذ يومين" : `منذ ${Math.floor(hours / 24)} أيام`;
export const waLink = (num: string, text: string) => `https://wa.me/${num}?text=${encodeURIComponent(text)}`;
