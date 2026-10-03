import { createFileRoute, Link } from "@tanstack/react-router";
import { PHONES } from "@/lib/data";
import { useList, pid } from "@/lib/store";
import { PageHeader, PhoneCard } from "@/components/ui-bits";

export const Route = createFileRoute("/favorites")({
  head: () => ({
    meta: [
      { title: "المفضلة | هواتف أدرار" },
      { name: "description", content: "الهواتف التي حفظتها لمتابعة أسعارها في أدرار." },
      { property: "og:title", content: "المفضلة | هواتف أدرار" },
      { property: "og:description", content: "الهواتف التي حفظتها لمتابعة أسعارها." },
    ],
  }),
  component: Favorites,
});

function Favorites() {
  const fav = useList("fav");
  const list = PHONES.filter((p) => fav.has(pid(p)));
  return (
    <div>
      <PageHeader title="المفضلة" subtitle="محفوظة على هذا الجهاز" />
      {list.length ? (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">{list.map((p) => <PhoneCard key={p.slug} phone={p} />)}</div>
      ) : (
        <p className="rounded-2xl bg-ice p-8 text-center text-sm text-muted-foreground">لا توجد هواتف في المفضلة. <Link to="/phones" className="font-bold text-primary">تصفح الهواتف</Link></p>
      )}
    </div>
  );
}
