import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Heart, GitCompareArrows, BadgeCheck, Trophy } from "lucide-react";
import { Bar, BarChart, Cell, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { phoneOf, brandOf, shopOf, formatDZD, bestListing, waLink, PHONES } from "@/lib/data";
import { useList, pid } from "@/lib/store";
import { DemoBadge, PhoneCard, PriceAlertDialog, SectionHead, Updated } from "@/components/ui-bits";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/phones/$brand/$slug")({
  loader: ({ params }) => {
    const phone = phoneOf(params.brand, params.slug);
    if (!phone) throw notFound();
    return { phone };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "الهاتف غير موجود" }, { name: "robots", content: "noindex" }] };
    const p = loaderData.phone;
    const t = `سعر ${brandOf(p.brand)?.name} ${p.model} في أدرار | هواتف أدرار`;
    const d = `قارن سعر ${p.model} في محلات أدرار — ابتداءً من ${formatDZD(bestListing(p).price)} (أسعار تجريبية).`;
    return { meta: [{ title: t }, { name: "description", content: d }, { property: "og:title", content: t }, { property: "og:description", content: d }, { property: "og:type", content: "product" }] };
  },
  notFoundComponent: () => <p className="py-20 text-center">الهاتف غير موجود. <Link to="/phones" className="text-primary">تصفح الهواتف</Link></p>,
  component: PhonePage,
});

function PhonePage() {
  const { phone: p } = Route.useLoaderData();
  const fav = useList("fav");
  const cmp = useList("compare");
  const id = pid(p);
  const best = bestListing(p);
  const rows = [...p.listings].sort((a, b) => Number(b.inStock) - Number(a.inStock) || a.price - b.price);
  const chart = rows.map((l) => ({ name: shopOf(l.shop)?.name ?? "", price: l.price, best: l === best }));
  const min = Math.min(...chart.map((c) => c.price));
  const max = Math.max(...chart.map((c) => c.price));
  const similar = PHONES.filter((x) => x.brand === p.brand && x.slug !== p.slug).slice(0, 3);
  const name = `${brandOf(p.brand)?.name} ${p.model}`;

  const specs = [
    ["RAM", `${p.ram}GB`], ["التخزين", `${p.storage}GB`], ["الشاشة", p.screen], ["المعالج", p.processor],
    ["الكاميرا", p.camera], ["البطارية", p.battery], ["النظام", p.os], ["5G", p.is5g ? "نعم" : "لا"],
  ];

  return (
    <div className="space-y-8">
      <div className="grid gap-5 md:grid-cols-2">
        <img src={p.image} alt={p.model} width={816} height={816} className="aspect-square w-full animate-rise rounded-3xl bg-ice object-cover ring-1 ring-border" />
        <div className="animate-rise">
          <div className="flex items-center gap-2">
            <Link to="/brands/$brand" params={{ brand: p.brand }} className="text-xs font-bold text-primary" dir="ltr">{brandOf(p.brand)?.name}</Link>
            <DemoBadge label="أسعار تجريبية" />
          </div>
          <h1 className="mt-1 text-3xl font-black tracking-tight" dir="ltr" style={{ textAlign: "right" }}>{p.model}</h1>
          <p className="text-sm text-muted-foreground" dir="ltr" style={{ textAlign: "right" }}>{p.ram}GB RAM / {p.storage}GB</p>
          <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
          <div className="mt-4 rounded-2xl bg-ice p-4 ring-1 ring-border">
            <p className="text-xs text-muted-foreground">أقل سعر متوفر</p>
            <p className="text-3xl font-black" style={{ fontFamily: "var(--font-display)" }}>{formatDZD(best.price)}</p>
            <p className="text-xs">لدى <b dir="ltr">{shopOf(best.shop)?.name}</b> · الفرق بين المحلات حتى {formatDZD(max - min)}</p>
            <Updated hours={best.updatedHoursAgo} className="mt-2 text-[11px]" />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button onClick={() => fav.toggle(id)} className={cn("flex items-center justify-center gap-1.5 rounded-xl border py-2.5 text-xs font-semibold", fav.has(id) ? "border-primary text-primary" : "border-border")}><Heart className="size-4" fill={fav.has(id) ? "currentColor" : "none"} />{fav.has(id) ? "في المفضلة" : "أضف للمفضلة"}</button>
            <button onClick={() => cmp.toggle(id)} className={cn("flex items-center justify-center gap-1.5 rounded-xl border py-2.5 text-xs font-semibold", cmp.has(id) ? "border-primary bg-accent text-accent-foreground" : "border-border")}><GitCompareArrows className="size-4" />{cmp.has(id) ? "في المقارنة" : "أضف للمقارنة"}</button>
            <PriceAlertDialog phone={p} />
          </div>
        </div>
      </div>

      <section>
        <h2 className="text-xl font-black tracking-tight">قارن سعر <span dir="ltr">{name}</span> في محلات أدرار</h2>
        <p className="mb-3 text-[11px] text-muted-foreground">{rows.length} محلات · جميع الأسعار والمحلات تجريبية</p>
        <div className="space-y-2">
          {rows.map((l) => {
            const s = shopOf(l.shop)!;
            const isBest = l === best;
            return (
              <div key={l.shop} className={cn("rounded-2xl bg-card p-3 ring-1", isBest ? "ring-2 ring-primary" : "ring-border")}>
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="flex items-center gap-1 text-sm font-bold" dir="ltr">
                      {s.verified && <BadgeCheck className="size-4 text-primary" />}{s.name}
                    </p>
                    <div className="mt-0.5 flex flex-wrap items-center gap-x-2 text-[11px]">
                      <span className={l.inStock ? "font-semibold text-success" : "font-semibold text-destructive"}>{l.inStock ? "متوفر" : "غير متوفر"}</span>
                      <Updated hours={l.updatedHoursAgo} />
                    </div>
                  </div>
                  <div className="text-left">
                    {isBest && <span className="mb-1 inline-flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground"><Trophy className="size-3" />أفضل سعر</span>}
                    <p className="text-lg font-black" style={{ fontFamily: "var(--font-display)" }}>{formatDZD(l.price)}</p>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-xs font-bold">
                  <a href={waLink(s.whatsapp, `السلام عليكم، هل ${p.model} متوفر؟ (عبر هواتف أدرار)`)} target="_blank" rel="noreferrer" className="rounded-lg bg-success py-2 text-center text-success-foreground">واتساب</a>
                  <a href={`tel:${s.phone}`} className="rounded-lg border border-border py-2 text-center">اتصال</a>
                  <Link to="/shops/$slug" params={{ slug: s.slug }} className="rounded-lg bg-accent py-2 text-center text-accent-foreground">عرض المحل</Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-card p-4 ring-1 ring-border">
          <p className="mb-2 text-sm font-bold">مقارنة الأسعار بين المحلات</p>
          <div className="h-56" dir="ltr">
            <ResponsiveContainer>
              <BarChart data={chart} layout="vertical" margin={{ left: 10, right: 10 }}>
                <XAxis type="number" hide domain={[min * 0.97, max * 1.01]} />
                <YAxis type="category" dataKey="name" width={110} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <Tooltip formatter={(v: number) => formatDZD(v)} cursor={{ fill: "var(--muted)" }} />
                <Bar dataKey="price" radius={[0, 8, 8, 0]}>
                  {chart.map((c) => <Cell key={c.name} fill={c.best ? "var(--primary)" : "var(--accent)"} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-2xl bg-card p-4 ring-1 ring-border">
          <p className="mb-2 text-sm font-bold">تطور السعر <span className="text-[11px] font-normal text-muted-foreground">(تجريبي)</span></p>
          <div className="h-56" dir="ltr">
            <ResponsiveContainer>
              <LineChart data={best.history} margin={{ left: 10, right: 10 }}>
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis hide domain={["dataMin - 2000", "dataMax + 2000"]} />
                <Tooltip formatter={(v: number) => formatDZD(v)} />
                <Line type="monotone" dataKey="price" stroke="var(--primary)" strokeWidth={3} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section>
        <SectionHead title="المواصفات" />
        <dl className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {specs.map(([k, v]) => (
            <div key={k} className="rounded-xl bg-ice p-3 ring-1 ring-border">
              <dt className="text-[11px] text-muted-foreground">{k}</dt>
              <dd className="text-sm font-bold" dir="ltr" style={{ textAlign: "right" }}>{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {similar.length > 0 && (
        <section>
          <SectionHead title="هواتف مشابهة" />
          <div className="grid gap-3 md:grid-cols-3">{similar.map((x) => <PhoneCard key={x.slug} phone={x} />)}</div>
        </section>
      )}
    </div>
  );
}
