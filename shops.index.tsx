import { createFileRoute } from "@tanstack/react-router";
import { SHOPS } from "@/lib/data";
import { PageHeader, ShopCard } from "@/components/ui-bits";

export const Route = createFileRoute("/shops/")({
  head: () => ({
    meta: [
      { title: "محلات الهواتف في أدرار | هواتف أدرار" },
      { name: "description", content: "دليل محلات بيع الهواتف في أدرار مع العناوين وطرق التواصل." },
      { property: "og:title", content: "محلات الهواتف في أدرار | هواتف أدرار" },
      { property: "og:description", content: "دليل محلات بيع الهواتف في أدرار." },
    ],
  }),
  component: () => (
    <div>
      <PageHeader title="المحلات" subtitle="محلات الهواتف في أدرار (بيانات تجريبية)" />
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">{SHOPS.map((s) => <ShopCard key={s.slug} shop={s} />)}</div>
    </div>
  ),
});
