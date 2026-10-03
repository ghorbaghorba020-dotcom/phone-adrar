import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { BadgeCheck, MapPin, Clock, Store } from "lucide-react";
import { shopOf, phonesOfShop, waLink, listingOf, ago } from "@/lib/data";
import { DemoBadge, PhoneCard, SectionHead, Stars } from "@/components/ui-bits";

export const Route = createFileRoute("/shops/$slug")({
  loader: ({ params }) => {
    const shop = shopOf(params.slug);
    if (!shop) throw notFound();
    return { shop };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "المحل غير موجود" }, { name: "robots", content: "noindex" }] };
    const s = loaderData.shop;
    const t = `${s.name} — محل هواتف في أدرار | هواتف أدرار`;
    const d = `${s.tagline}. منتجات وأسعار ${s.name} (محل تجريبي).`;
    return { meta: [{ title: t }, { name: "description", content: d }, { property: "og:title", content: t }, { property: "og:description", content: d }] };
  },
  notFoundComponent: () => <p className="py-20 text-center">المحل غير موجود. <Link to="/shops" className="text-primary">كل المحلات</Link></p>,
  component: ShopPage,
});

function ShopPage() {
  const { shop } = Route.useLoaderData();
  const phones = phonesOfShop(shop.slug);
  const ls = phones.map((p) => listingOf(p, shop.slug)!);
  const offers = ls.filter((l) => l.oldPrice).length;
  const updated = Math.min(...ls.map((l) => l.updatedHoursAgo));

  return (
    <div className="space-y-8">
      <section className="animate-rise overflow-hidden rounded-3xl bg-card ring-1 ring-border">
        <div className="h-24 bg-hero sm:h-32" />
        <div className="-mt-10 px-4 pb-5 sm:px-6">
          <div className="grid size-20 place-items-center rounded-2xl bg-background text-primary shadow-lg ring-4 ring-background"><Store className="size-9" /></div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <h1 className="flex items-center gap-1.5 text-2xl font-black" dir="ltr">{shop.name}{shop.verified && <BadgeCheck className="size-5 text-primary" />}</h1>
            <DemoBadge label="محل تجريبي" />
          </div>
          <div className="mt-1 flex items-center gap-2"><Stars value={shop.rating} /><span className="text-xs text-muted-foreground">({shop.reviews} تقييم تجريبي)</span></div>
          <p className="mt-1 text-sm font-semibold">{shop.tagline}</p>
          <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1"><MapPin className="size-3.5" />{shop.address}، أدرار، الجزائر</span>
            <span className="inline-flex items-center gap-1"><Clock className="size-3.5" />{shop.hours}</span>
          </p>
          <div className="mt-4 grid grid-cols-3 gap-2 text-sm font-bold sm:max-w-md">
            <a href={waLink(shop.whatsapp, "السلام عليكم (عبر هواتف أدرار)")} target="_blank" rel="noreferrer" className="rounded-xl bg-success py-2.5 text-center text-success-foreground">واتساب</a>
            <a href={`tel:${shop.phone}`} className="rounded-xl bg-primary py-2.5 text-center text-primary-foreground">اتصال</a>
            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shop.mapQuery)}`} target="_blank" rel="noreferrer" className="rounded-xl border border-border py-2.5 text-center">الموقع</a>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2">
            {[["عدد المنتجات", String(phones.length)], ["العروض الحالية", String(offers)], ["آخر تحديث", ago(updated)]].map(([k, v]) => (
              <div key={k} className="rounded-xl bg-ice p-3 text-center ring-1 ring-border">
                <p className="text-lg font-black" style={{ fontFamily: "var(--font-display)" }}>{v}</p>
                <p className="text-[11px] text-muted-foreground">{k}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <SectionHead title="منتجات المحل" sub="أسعار تجريبية" />
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">{phones.map((p, i) => <PhoneCard key={p.slug} phone={p} shopSlug={shop.slug} delay={i * 40} />)}</div>
      </section>
    </div>
  );
}
