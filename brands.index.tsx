import { createFileRoute, Link } from "@tanstack/react-router";
import { BRANDS, PHONES } from "@/lib/data";
import { PageHeader } from "@/components/ui-bits";

export const Route = createFileRoute("/brands/")({
  head: () => ({
    meta: [
      { title: "ماركات الهواتف في أدرار | هواتف أدرار" },
      { name: "description", content: "تصفح الهواتف حسب الماركة: Apple، Samsung، Xiaomi وغيرها في محلات أدرار." },
      { property: "og:title", content: "ماركات الهواتف | هواتف أدرار" },
      { property: "og:description", content: "تصفح الهواتف حسب الماركة في محلات أدرار." },
    ],
  }),
  component: () => (
    <div>
      <PageHeader title="الماركات" subtitle="اختر الماركة لعرض الهواتف المتوفرة" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {BRANDS.map((b) => {
          const n = PHONES.filter((p) => p.brand === b.slug).length;
          return (
            <Link key={b.slug} to="/brands/$brand" params={{ brand: b.slug }} className="animate-rise rounded-2xl bg-card p-4 ring-1 ring-border transition hover:ring-primary">
              <p className="text-lg font-black" dir="ltr" style={{ fontFamily: "var(--font-display)" }}>{b.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">{n} هواتف</p>
              {b.series.length > 0 && <p className="mt-2 truncate text-[11px] text-muted-foreground" dir="ltr">{b.series.join(" · ")}</p>}
            </Link>
          );
        })}
      </div>
    </div>
  ),
});
