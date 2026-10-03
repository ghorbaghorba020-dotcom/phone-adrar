import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { z } from "zod";
import { Search } from "lucide-react";
import { BRANDS, PHONES, SHOPS, bestListing, brandOf, lastUpdated } from "@/lib/data";
import { PageHeader, PhoneCard } from "@/components/ui-bits";

const schema = z.object({
  q: z.string().optional(),
  brand: z.string().optional(),
  shop: z.string().optional(),
  ram: z.coerce.number().optional(),
  storage: z.coerce.number().optional(),
  min: z.coerce.number().optional(),
  max: z.coerce.number().optional(),
  g5: z.boolean().optional(),
  stock: z.boolean().optional(),
  cond: z.enum(["new", "used"]).optional(),
  sort: z.enum(["low", "high", "added", "updated", "views"]).optional(),
});

export const Route = createFileRoute("/phones/")({
  validateSearch: (s) => schema.parse(s),
  head: () => ({
    meta: [
      { title: "الهواتف في أدرار — أسعار ومقارنة | هواتف أدرار" },
      { name: "description", content: "ابحث وفلتر الهواتف المتوفرة في محلات أدرار حسب الماركة والسعر والذاكرة." },
      { property: "og:title", content: "الهواتف في أدرار | هواتف أدرار" },
      { property: "og:description", content: "ابحث وفلتر الهواتف المتوفرة في محلات أدرار." },
    ],
  }),
  component: Phones,
});

const sel = "rounded-xl border border-input bg-background px-3 py-2 text-xs font-semibold outline-none focus:border-primary";

function Phones() {
  const s = Route.useSearch();
  const nav = useNavigate({ from: "/phones/" });
  const set = (patch: Partial<z.infer<typeof schema>>) => nav({ search: (prev) => ({ ...prev, ...patch }), replace: true });

  const results = useMemo(() => {
    const q = (s.q ?? "").toLowerCase().trim();
    let r = PHONES.filter((p) => {
      const best = bestListing(p).price;
      if (q && !`${p.model} ${brandOf(p.brand)?.name} ${p.series}`.toLowerCase().includes(q)) return false;
      if (s.brand && p.brand !== s.brand) return false;
      if (s.shop && !p.listings.some((l) => l.shop === s.shop)) return false;
      if (s.ram && p.ram !== s.ram) return false;
      if (s.storage && p.storage !== s.storage) return false;
      if (s.min && best < s.min) return false;
      if (s.max && best > s.max) return false;
      if (s.g5 && !p.is5g) return false;
      if (s.stock && !p.listings.some((l) => l.inStock)) return false;
      if (s.cond && !p.listings.some((l) => l.condition === s.cond)) return false;
      return true;
    });
    const by = {
      low: (a: typeof r[0], b: typeof r[0]) => bestListing(a).price - bestListing(b).price,
      high: (a: typeof r[0], b: typeof r[0]) => bestListing(b).price - bestListing(a).price,
      added: (a: typeof r[0], b: typeof r[0]) => a.addedDaysAgo - b.addedDaysAgo,
      updated: (a: typeof r[0], b: typeof r[0]) => lastUpdated(a) - lastUpdated(b),
      views: (a: typeof r[0], b: typeof r[0]) => b.views - a.views,
    };
    r = [...r].sort(by[s.sort ?? "low"]);
    return r;
  }, [s]);

  return (
    <div>
      <PageHeader title="الهواتف" subtitle={`${results.length} نتيجة في محلات أدرار`} />
      <div className="mb-3 flex items-center gap-2 rounded-2xl bg-background p-1.5 ring-1 ring-border">
        <Search className="ms-2 size-4 text-muted-foreground" />
        <input defaultValue={s.q} onChange={(e) => set({ q: e.target.value || undefined })} placeholder="ابحث عن هاتف، ماركة أو موديل..." className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none" />
      </div>
      <div className="no-scrollbar -mx-4 mb-5 flex gap-2 overflow-x-auto px-4 pb-1">
        <select className={sel} value={s.brand ?? ""} onChange={(e) => set({ brand: e.target.value || undefined })}>
          <option value="">كل الماركات</option>
          {BRANDS.map((b) => <option key={b.slug} value={b.slug}>{b.name}</option>)}
        </select>
        <select className={sel} value={s.sort ?? "low"} onChange={(e) => set({ sort: e.target.value as "low" })}>
          <option value="low">الأقل سعرًا</option>
          <option value="high">الأعلى سعرًا</option>
          <option value="added">الأحدث إضافة</option>
          <option value="updated">آخر تحديث</option>
          <option value="views">الأكثر مشاهدة</option>
        </select>
        <select className={sel} value={s.ram ?? ""} onChange={(e) => set({ ram: e.target.value ? Number(e.target.value) : undefined })}>
          <option value="">RAM</option>
          {[4, 6, 8, 12].map((v) => <option key={v} value={v}>{v}GB</option>)}
        </select>
        <select className={sel} value={s.storage ?? ""} onChange={(e) => set({ storage: e.target.value ? Number(e.target.value) : undefined })}>
          <option value="">التخزين</option>
          {[64, 128, 256, 512].map((v) => <option key={v} value={v}>{v}GB</option>)}
        </select>
        <select className={sel} value={s.cond ?? ""} onChange={(e) => set({ cond: (e.target.value || undefined) as "new" })}>
          <option value="">جديد / مستعمل</option>
          <option value="new">جديد</option>
          <option value="used">مستعمل</option>
        </select>
        <select className={sel} value={s.shop ?? ""} onChange={(e) => set({ shop: e.target.value || undefined })}>
          <option value="">كل المحلات</option>
          {SHOPS.map((x) => <option key={x.slug} value={x.slug}>{x.name}</option>)}
        </select>
        <input type="number" inputMode="numeric" placeholder="أدنى سعر" className={`${sel} w-24`} defaultValue={s.min} onChange={(e) => set({ min: e.target.value ? Number(e.target.value) : undefined })} />
        <input type="number" inputMode="numeric" placeholder="أقصى سعر" className={`${sel} w-24`} defaultValue={s.max} onChange={(e) => set({ max: e.target.value ? Number(e.target.value) : undefined })} />
        <button className={`${sel} shrink-0 ${s.g5 ? "border-primary bg-accent text-accent-foreground" : ""}`} onClick={() => set({ g5: s.g5 ? undefined : true })}>5G</button>
        <button className={`${sel} shrink-0 ${s.stock ? "border-primary bg-accent text-accent-foreground" : ""}`} onClick={() => set({ stock: s.stock ? undefined : true })}>متوفر فقط</button>
      </div>
      {results.length ? (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">{results.map((p, i) => <PhoneCard key={p.slug} phone={p} delay={i * 40} />)}</div>
      ) : (
        <p className="rounded-2xl bg-ice p-8 text-center text-sm text-muted-foreground">لا توجد نتائج. جرّب كلمات أخرى أو أزل بعض الفلاتر.</p>
      )}
    </div>
  );
}
