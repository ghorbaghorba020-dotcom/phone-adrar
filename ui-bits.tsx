import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Heart, GitCompareArrows, MessageCircle, Phone as PhoneIcon, BadgeCheck, Store, Star, Clock, BellRing } from "lucide-react";
import { toast } from "sonner";
import type { Phone, Shop } from "@/lib/data";
import { bestListing, brandOf, shopOf, formatDZD, ago, phonesOfShop, waLink, discountOf, isStale } from "@/lib/data";
import { useList, pid } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export function DemoBadge({ className, label = "نسخة تجريبية" }: { className?: string; label?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-md border border-primary/30 bg-primary/10 px-2 py-1 text-[10px] font-bold text-primary", className)}>
      {label}
    </span>
  );
}

export function Updated({ hours, className }: { hours: number; className?: string }) {
  const stale = isStale(hours);
  return (
    <span className={cn("inline-flex items-center gap-1", stale ? "text-destructive" : "text-muted-foreground", className)}>
      <Clock className="size-3" />
      {stale ? `تم التحديث ${ago(hours)}` : `آخر تحديث: ${ago(hours)}`}
    </span>
  );
}

export function Stars({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" dir="ltr">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={cn("size-3.5", i <= Math.round(value) ? "fill-current text-primary" : "text-muted-foreground/40")} />
      ))}
      <span className="ms-1 text-xs font-bold">{value.toFixed(1)}</span>
    </span>
  );
}

export function SectionHead({ title, to, label, sub }: { title: string; to?: string; label?: string; sub?: string }) {
  return (
    <div className="mb-3 flex items-end justify-between gap-3">
      <div>
        <h2 className="text-lg font-black tracking-tight sm:text-xl">{title}</h2>
        {sub && <p className="text-[11px] text-muted-foreground">{sub}</p>}
      </div>
      {to && (
        <Link to={to} className="shrink-0 text-xs font-semibold text-primary">
          {label ?? "عرض الكل"}
        </Link>
      )}
    </div>
  );
}

export function PhoneCard({ phone, delay = 0, shopSlug }: { phone: Phone; delay?: number; shopSlug?: string }) {
  const fav = useList("fav");
  const cmp = useList("compare");
  const id = pid(phone);
  const best = (shopSlug && phone.listings.find((l) => l.shop === shopSlug)) || bestListing(phone);
  const discount = discountOf(best);
  const shop = shopOf(best.shop);
  return (
    <article className="group animate-rise rounded-2xl bg-card p-3 shadow-sm ring-1 ring-border transition hover:-translate-y-0.5 hover:shadow-md" style={{ animationDelay: `${delay}ms` }}>
      <div className="flex gap-3">
        <Link to="/phones/$brand/$slug" params={{ brand: phone.brand, slug: phone.slug }} className="relative shrink-0">
          <img src={phone.image} alt={phone.model} loading="lazy" width={816} height={816} className="size-24 rounded-xl bg-ice object-cover sm:size-28" />
          {discount > 0 && (
            <span dir="ltr" className="absolute -top-1.5 -right-1.5 rounded-full bg-destructive px-1.5 py-0.5 text-[10px] font-bold text-destructive-foreground">-{discount}%</span>
          )}
        </Link>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <Link to="/phones/$brand/$slug" params={{ brand: phone.brand, slug: phone.slug }} className="min-w-0">
              <p className="text-[11px] font-semibold text-primary" dir="ltr">{brandOf(phone.brand)?.name}</p>
              <h3 className="truncate text-[15px] font-bold tracking-tight" dir="ltr">{phone.model}</h3>
            </Link>
            <button onClick={() => fav.toggle(id)} aria-label="أضف للمفضلة" className={cn("grid size-8 shrink-0 place-items-center rounded-full transition active:scale-90", fav.has(id) ? "text-primary" : "text-muted-foreground/50")}>
              <Heart className="size-5" fill={fav.has(id) ? "currentColor" : "none"} />
            </button>
          </div>
          <p className="text-[11px] text-muted-foreground" dir="ltr">{phone.ram}GB RAM / {phone.storage}GB{phone.is5g ? " · 5G" : ""}</p>
          <p className="mt-1 text-lg font-black tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
            {best.price.toLocaleString("en-US")} <span className="text-xs font-bold text-muted-foreground">دج</span>
            {best.oldPrice && <span className="ms-2 text-xs font-medium text-muted-foreground line-through">{best.oldPrice.toLocaleString("en-US")}</span>}
          </p>
          <p className="flex flex-wrap items-center gap-x-2 text-[11px]">
            <span className={best.inStock ? "font-semibold text-success" : "font-semibold text-destructive"}>{best.inStock ? "متوفر" : "غير متوفر"}</span>
            <span className="truncate font-semibold text-foreground/80" dir="ltr">{shop?.name}</span>
          </p>
          <Updated hours={best.updatedHoursAgo} className="text-[10px]" />
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <Link to="/phones/$brand/$slug" params={{ brand: phone.brand, slug: phone.slug }} className="rounded-xl bg-primary py-2 text-center text-xs font-bold text-primary-foreground transition active:scale-[0.98]">
          قارن الأسعار
        </Link>
        <button onClick={() => cmp.toggle(id)} className={cn("flex items-center justify-center gap-1 rounded-xl border py-2 text-xs font-semibold transition active:scale-[0.98]", cmp.has(id) ? "border-primary bg-accent text-accent-foreground" : "border-border")}>
          <GitCompareArrows className="size-3.5" /> {cmp.has(id) ? "في المقارنة" : "مقارنة"}
        </button>
      </div>
    </article>
  );
}

export function ShopCard({ shop }: { shop: Shop; featured?: boolean }) {
  const count = phonesOfShop(shop.slug).length;
  return (
    <div className="rounded-2xl bg-card p-3 shadow-sm ring-1 ring-border">
      <div className="flex items-center gap-3">
        <div className="grid size-14 shrink-0 place-items-center rounded-xl bg-hero text-primary-foreground"><Store className="size-6" /></div>
        <Link to="/shops/$slug" params={{ slug: shop.slug }} className="min-w-0 flex-1">
          <h3 className="flex items-center gap-1 text-sm font-bold" dir="ltr">
            {shop.verified && <BadgeCheck className="size-4 shrink-0 text-primary" />}
            <span className="truncate">{shop.name}</span>
          </h3>
          <p className="truncate text-xs text-muted-foreground">{shop.tagline} · {count} منتج</p>
          <div className="mt-1 flex items-center gap-2"><Stars value={shop.rating} /><DemoBadge label="محل تجريبي" className="py-0.5" /></div>
        </Link>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-xs font-bold">
        <a href={waLink(shop.whatsapp, "السلام عليكم")} target="_blank" rel="noreferrer" className="rounded-lg bg-success py-2 text-center text-success-foreground">واتساب</a>
        <a href={`tel:${shop.phone}`} className="rounded-lg border border-border py-2 text-center">اتصال</a>
        <Link to="/shops/$slug" params={{ slug: shop.slug }} className="rounded-lg bg-accent py-2 text-center text-accent-foreground">عرض المحل</Link>
      </div>
    </div>
  );
}

export function ContactButtons({ shop, phone }: { shop: Shop; phone?: Phone }) {
  const msg = phone ? `السلام عليكم، هل ${phone.model} متوفر؟ (عبر هواتف أدرار)` : "السلام عليكم";
  return (
    <div className="flex gap-1.5">
      <a href={waLink(shop.whatsapp, msg)} target="_blank" rel="noreferrer" className="grid size-8 place-items-center rounded-lg bg-success text-success-foreground" aria-label="واتساب"><MessageCircle className="size-4" /></a>
      <a href={`tel:${shop.phone}`} className="grid size-8 place-items-center rounded-lg border border-border" aria-label="اتصال"><PhoneIcon className="size-4" /></a>
    </div>
  );
}

export function PageHeader({ title, subtitle, demo }: { title: string; subtitle?: string | undefined; demo?: string }) {
  return (
    <div className="mb-5 animate-rise">
      <div className="flex flex-wrap items-center gap-2">
        <h1 className="text-2xl font-black tracking-tight sm:text-3xl">{title}</h1>
        {demo && <DemoBadge label={demo} />}
      </div>
      {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

const field = "w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary";
export const inputCls = field;

export function JoinDialog({ children }: { children: (open: () => void) => ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      {children(() => setOpen(true))}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent dir="rtl" className="max-w-md">
          <DialogHeader className="text-right">
            <DialogTitle>انضم إلى هواتف أدرار</DialogTitle>
            <DialogDescription>نموذج تجريبي — لن يتم إرسال أي بيانات.</DialogDescription>
          </DialogHeader>
          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              setOpen(false);
              toast.success("تم استلام طلبك (تجريبي). سنتواصل معك قريبًا.");
            }}
          >
            <input required placeholder="اسم المحل" className={field} />
            <input required placeholder="اسم صاحب المحل" className={field} />
            <input required placeholder="رقم الهاتف" inputMode="tel" className={field} />
            <input placeholder="العنوان في أدرار" className={field} />
            <textarea placeholder="ملاحظات (اختياري)" rows={3} className={field} />
            <button className="w-full rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground">إرسال الطلب</button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function PriceAlertDialog({ phone }: { phone: Phone }) {
  const [open, setOpen] = useState(false);
  const best = bestListing(phone);
  return (
    <>
      <button onClick={() => setOpen(true)} className="col-span-2 flex items-center justify-center gap-1.5 rounded-xl border border-primary/40 bg-accent py-2.5 text-xs font-bold text-accent-foreground">
        <BellRing className="size-4" /> نبهني عند انخفاض السعر
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent dir="rtl" className="max-w-sm">
          <DialogHeader className="text-right">
            <DialogTitle>تنبيه السعر</DialogTitle>
            <DialogDescription>السعر الحالي: {formatDZD(best.price)} — ميزة تجريبية.</DialogDescription>
          </DialogHeader>
          <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); setOpen(false); toast.success("تم حفظ التنبيه (تجريبي)"); }}>
            <label className="block text-xs font-semibold">السعر المستهدف (دج)
              <input required type="number" defaultValue={Math.round(best.price * 0.95)} className={cn(field, "mt-1")} />
            </label>
            <label className="block text-xs font-semibold">رقم الهاتف أو البريد
              <input required className={cn(field, "mt-1")} />
            </label>
            <button className="w-full rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground">حفظ التنبيه</button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export { formatDZD };
