import { createFileRoute, Link } from "@tanstack/react-router";
import { SHOPS } from "@/lib/data";
import { PageHeader, ShopCard } from "@/components/ui-bits";
import { ShopOwnerPitch } from "@/components/shop-pitch";

export const Route = createFileRoute("/for-shops")({
  head: () => ({
    meta: [
      { title: "لأصحاب المحلات — اعرض هواتفك على هواتف أدرار" },
      { name: "description", content: "عندك محل هواتف في أدرار؟ اعرض منتجاتك وأسعارك واستقبل زبائن جدد. نسخة تجريبية." },
      { property: "og:title", content: "لأصحاب المحلات | هواتف أدرار" },
      { property: "og:description", content: "خلّي منتجاتك توصل لعدد أكبر من الزبائن في أدرار." },
    ],
  }),
  component: ForShops,
});

function ForShops() {
  return (
    <div className="space-y-8">
      <PageHeader title="لأصحاب المحلات" subtitle="هكذا يظهر محلك ومنتجاتك للزبائن على المنصة." demo="نسخة تجريبية" />
      <ShopOwnerPitch />
      <section>
        <h2 className="mb-1 text-lg font-black">هكذا يظهر محلك</h2>
        <p className="mb-3 text-xs text-muted-foreground">مثال من محل تجريبي — اضغط "عرض المحل" لرؤية صفحة المحل كاملة.</p>
        <div className="max-w-md"><ShopCard shop={SHOPS[0]!} /></div>
      </section>
      <Link to="/dashboard" className="block rounded-2xl bg-accent p-5 text-center font-bold text-accent-foreground">افتح لوحة التحكم التجريبية ←</Link>
    </div>
  );
}
