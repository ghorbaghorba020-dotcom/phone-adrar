import { createFileRoute, Link } from "@tanstack/react-router";
import { PHONES, bestListing, discountOf, formatDZD, shopOf } from "@/lib/data";
import { PageHeader } from "@/components/ui-bits";

export const Route = createFileRoute("/offers")({
  head: () => ({
    meta: [
      { title: "عروض اليوم على الهواتف في أدرار | هواتف أدرار" },
      { name: "description", content: "تخفيضات تجريبية على الهواتف في محلات أدرار." },
      { property: "og:title", content: "عروض اليوم | هواتف أدرار" },
      { property: "og:description", content: "تخفيضات تجريبية على الهواتف في أدرار." },
    ],
  }),
  component: Offers,
});

function Offers() {
  const list = PHONES.map((p) => ({ p, l: p.listings.find((l) => l.oldPrice) })).filter((x) => x.l).sort((a, b) => discountOf(b.l!) - discountOf(a.l!));
  return (
    <div>
      <PageHeader title="🔥 عروض اليوم" subtitle="تخفيضات لدى محلات أدرار" demo="أسعار تجريبية" />
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {list.map(({ p, l }) => (
          <Link key={p.slug} to="/phones/$brand/$slug" params={{ brand: p.brand, slug: p.slug }} className="flex gap-3 rounded-2xl bg-card p-3 shadow-sm ring-1 ring-border transition hover:-translate-y-0.5">
            <img src={p.image} alt={p.model} loading="lazy" width={816} height={816} className="size-24 rounded-xl bg-ice object-cover" />
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <h3 className="truncate font-bold" dir="ltr">{p.model}</h3>
                <span dir="ltr" className="rounded-full bg-destructive px-2 py-0.5 text-[11px] font-bold text-destructive-foreground">-{discountOf(l!)}%</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">قبل: <span className="line-through">{formatDZD(l!.oldPrice!)}</span></p>
              <p className="text-lg font-black text-primary" style={{ fontFamily: "var(--font-display)" }}>الآن: {formatDZD(l!.price)}</p>
              <p className="text-[11px] text-muted-foreground" dir="ltr" style={{ textAlign: "right" }}>{shopOf(l!.shop)?.name}{bestListing(p) === l ? " · أفضل سعر" : ""}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
