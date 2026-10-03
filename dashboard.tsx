import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Package, Eye, Heart, MessageCircle, TrendingDown, Plus } from "lucide-react";
import { toast } from "sonner";
import { Area, AreaChart, Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { BRANDS, SHOPS, phonesOfShop, listingOf, formatDZD } from "@/lib/data";
import { DemoBadge, inputCls, Updated } from "@/components/ui-bits";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "لوحة تحكم المحل (تجريبية) | هواتف أدرار" },
      { name: "description", content: "عرض تجريبي لما يراه صاحب المحل: المنتجات، الأسعار، المخزون والإحصائيات." },
      { property: "og:title", content: "لوحة تحكم المحل | هواتف أدرار" },
      { property: "og:description", content: "هكذا يدير صاحب المحل منتجاته وأسعاره." },
    ],
  }),
  component: Dashboard,
});

const shop = SHOPS[0]!;
const TABS = ["منتجاتي", "إضافة منتج", "الأسعار", "المخزون", "الإحصائيات", "معلومات المحل"] as const;
const VIEWS = ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"].map((d, i) => ({ d, v: [380, 420, 510, 460, 590, 640, 240][i]!, w: [9, 11, 14, 8, 12, 15, 5][i]! }));

type Row = { id: string; model: string; price: number; oldPrice?: number; inStock: boolean; hours: number };

function Dashboard() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("منتجاتي");
  const [rows, setRows] = useState<Row[]>(() =>
    phonesOfShop(shop.slug).map((p) => {
      const l = listingOf(p, shop.slug)!;
      return { id: p.slug, model: p.model, price: l.price, ...(l.oldPrice ? { oldPrice: l.oldPrice } : {}), inStock: l.inStock, hours: l.updatedHoursAgo };
    }),
  );
  const update = (id: string, patch: Partial<Row>) => setRows((r) => r.map((x) => (x.id === id ? { ...x, ...patch, hours: 0 } : x)));

  const kpis = [
    { Icon: Package, k: "المنتجات", v: "48" },
    { Icon: Eye, k: "المشاهدات", v: "3,240" },
    { Icon: Heart, k: "المفضلة", v: "186" },
    { Icon: MessageCircle, k: "نقرات واتساب", v: "74" },
    { Icon: TrendingDown, k: "منتجات بسعر منخفض", v: "6" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-xs text-muted-foreground">لوحة تحكم المحل</p>
          <h1 className="text-2xl font-black">مرحبا، <span dir="ltr">{shop.name}</span> 👋</h1>
        </div>
        <DemoBadge label="لوحة تجريبية — الأرقام غير حقيقية" />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {kpis.map(({ Icon, k, v }) => (
          <div key={k} className="rounded-2xl bg-card p-4 shadow-sm ring-1 ring-border">
            <Icon className="size-5 text-primary" />
            <p className="mt-2 text-2xl font-black" style={{ fontFamily: "var(--font-display)" }}>{v}</p>
            <p className="text-[11px] text-muted-foreground">{k}</p>
          </div>
        ))}
      </div>

      <div className="no-scrollbar -mx-4 flex gap-1.5 overflow-x-auto px-4">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={cn("shrink-0 rounded-xl px-3.5 py-2 text-xs font-bold", tab === t ? "bg-primary text-primary-foreground" : "bg-muted text-foreground/80")}>{t}</button>
        ))}
      </div>

      {tab === "منتجاتي" && (
        <div className="space-y-2">
          <button onClick={() => setTab("إضافة منتج")} className="flex w-full items-center justify-center gap-1 rounded-xl border border-dashed border-primary py-3 text-sm font-bold text-primary"><Plus className="size-4" />إضافة منتج</button>
          {rows.map((r) => (
            <div key={r.id} className="flex items-center justify-between gap-3 rounded-2xl bg-card p-3 ring-1 ring-border">
              <div className="min-w-0">
                <p className="truncate text-sm font-bold" dir="ltr">{r.model}</p>
                <Updated hours={r.hours} className="text-[11px]" />
              </div>
              <div className="text-left">
                <p className="text-sm font-black">{formatDZD(r.price)}</p>
                <p className={cn("text-[11px] font-semibold", r.inStock ? "text-success" : "text-destructive")}>{r.inStock ? "متوفر" : "غير متوفر"}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "إضافة منتج" && (
        <form
          className="grid gap-3 rounded-2xl bg-card p-4 ring-1 ring-border sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            const f = new FormData(e.currentTarget);
            const old = Number(f.get("old"));
            setRows((r) => [{ id: String(Date.now()), model: String(f.get("name")), price: Number(f.get("price")), ...(old ? { oldPrice: old } : {}), inStock: f.get("stock") === "in", hours: 0 }, ...r]);
            toast.success("تمت إضافة المنتج (تجريبي)");
            setTab("منتجاتي");
          }}
        >
          <label className="text-xs font-semibold">اسم الهاتف<input name="name" required placeholder="مثال: Galaxy S26 Ultra" className={cn(inputCls, "mt-1")} /></label>
          <label className="text-xs font-semibold">الماركة<select name="brand" className={cn(inputCls, "mt-1")}>{BRANDS.map((b) => <option key={b.slug}>{b.name}</option>)}</select></label>
          <label className="text-xs font-semibold">السعة<select name="storage" className={cn(inputCls, "mt-1")}>{[128, 256, 512, 1024].map((s) => <option key={s}>{s}GB</option>)}</select></label>
          <label className="text-xs font-semibold">RAM<select name="ram" className={cn(inputCls, "mt-1")}>{[4, 6, 8, 12, 16].map((s) => <option key={s}>{s}GB</option>)}</select></label>
          <label className="text-xs font-semibold">السعر (دج)<input name="price" type="number" required className={cn(inputCls, "mt-1")} /></label>
          <label className="text-xs font-semibold">السعر السابق (دج)<input name="old" type="number" className={cn(inputCls, "mt-1")} /></label>
          <label className="text-xs font-semibold">حالة المخزون<select name="stock" className={cn(inputCls, "mt-1")}><option value="in">متوفر</option><option value="out">غير متوفر</option></select></label>
          <label className="text-xs font-semibold">الصور<input type="file" accept="image/*" multiple className={cn(inputCls, "mt-1 py-2 text-xs")} /></label>
          <button className="rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground sm:col-span-2">إضافة المنتج</button>
        </form>
      )}

      {(tab === "الأسعار" || tab === "المخزون") && (
        <div className="space-y-2">
          {rows.map((r) => (
            <div key={r.id} className="flex items-center justify-between gap-3 rounded-2xl bg-card p-3 ring-1 ring-border">
              <p className="min-w-0 truncate text-sm font-bold" dir="ltr">{r.model}</p>
              {tab === "الأسعار" ? (
                <input type="number" defaultValue={r.price} onBlur={(e) => { const v = Number(e.target.value); if (v && v !== r.price) { update(r.id, { price: v }); toast.success("تم تحديث السعر (تجريبي)"); } }} className={cn(inputCls, "w-32 py-1.5 text-left")} />
              ) : (
                <button onClick={() => update(r.id, { inStock: !r.inStock })} className={cn("rounded-lg px-3 py-1.5 text-xs font-bold", r.inStock ? "bg-success text-success-foreground" : "bg-destructive text-destructive-foreground")}>{r.inStock ? "متوفر" : "غير متوفر"}</button>
              )}
            </div>
          ))}
        </div>
      )}

      {tab === "الإحصائيات" && (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-card p-4 ring-1 ring-border">
            <p className="mb-2 text-sm font-bold">المشاهدات هذا الأسبوع</p>
            <div className="h-56" dir="ltr">
              <ResponsiveContainer><AreaChart data={VIEWS}><XAxis dataKey="d" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} /><Tooltip /><Area dataKey="v" name="مشاهدات" stroke="var(--primary)" fill="var(--accent)" strokeWidth={2} /></AreaChart></ResponsiveContainer>
            </div>
          </div>
          <div className="rounded-2xl bg-card p-4 ring-1 ring-border">
            <p className="mb-2 text-sm font-bold">نقرات واتساب</p>
            <div className="h-56" dir="ltr">
              <ResponsiveContainer><BarChart data={VIEWS}><XAxis dataKey="d" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} /><Tooltip /><Bar dataKey="w" name="نقرات" fill="var(--success)" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {tab === "معلومات المحل" && (
        <form className="grid gap-3 rounded-2xl bg-card p-4 ring-1 ring-border sm:grid-cols-2" onSubmit={(e) => { e.preventDefault(); toast.success("تم الحفظ (تجريبي)"); }}>
          <label className="text-xs font-semibold">اسم المحل<input defaultValue={shop.name} className={cn(inputCls, "mt-1")} /></label>
          <label className="text-xs font-semibold">الوصف<input defaultValue={shop.tagline} className={cn(inputCls, "mt-1")} /></label>
          <label className="text-xs font-semibold">العنوان<input defaultValue={shop.address} className={cn(inputCls, "mt-1")} /></label>
          <label className="text-xs font-semibold">ساعات العمل<input defaultValue={shop.hours} className={cn(inputCls, "mt-1")} /></label>
          <label className="text-xs font-semibold">رقم الهاتف<input defaultValue={shop.phone} className={cn(inputCls, "mt-1")} /></label>
          <label className="text-xs font-semibold">واتساب<input defaultValue={shop.whatsapp} className={cn(inputCls, "mt-1")} /></label>
          <button className="rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground sm:col-span-2">حفظ</button>
        </form>
      )}
    </div>
  );
}
