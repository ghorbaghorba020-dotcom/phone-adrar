import { createFileRoute, notFound } from "@tanstack/react-router";
import { brandOf, PHONES } from "@/lib/data";
import { PageHeader, PhoneCard } from "@/components/ui-bits";

export const Route = createFileRoute("/brands/$brand")({
  loader: ({ params }) => {
    const brand = brandOf(params.brand);
    if (!brand) throw notFound();
    return { brand };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "الماركة غير موجودة" }, { name: "robots", content: "noindex" }] };
    const t = `هواتف ${loaderData.brand.name} في أدرار | هواتف أدرار`;
    const d = `أسعار هواتف ${loaderData.brand.name} في محلات أدرار.`;
    return { meta: [{ title: t }, { name: "description", content: d }, { property: "og:title", content: t }, { property: "og:description", content: d }] };
  },
  component: BrandPage,
});

function BrandPage() {
  const { brand } = Route.useLoaderData();
  const list = PHONES.filter((p) => p.brand === brand.slug);
  return (
    <div>
      <PageHeader title={`هواتف ${brand.name}`} subtitle={brand.series.join(" · ") || undefined} />
      {list.length ? (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">{list.map((p) => <PhoneCard key={p.slug} phone={p} />)}</div>
      ) : (
        <p className="rounded-2xl bg-ice p-8 text-center text-sm text-muted-foreground">لا توجد هواتف من هذه الماركة حاليًا.</p>
      )}
    </div>
  );
}
