import { createFileRoute, Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { PHONES, bestListing, formatDZD, shopOf } from "@/lib/data";
import { useList, pid } from "@/lib/store";
import { PageHeader } from "@/components/ui-bits";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: "مقارنة الهواتف | هواتف أدرار" },
      { name: "description", content: "قارن حتى 3 هواتف: السعر، الشاشة، المعالج، الكاميرا والبطارية." },
      { property: "og:title", content: "مقارنة الهواتف | هواتف أدرار" },
      { property: "og:description", content: "قارن بين الهواتف المتوفرة في أدرار." },
    ],
  }),
  component: Compare,
});

function Compare() {
  const cmp = useList("compare");
  const phones = cmp.list.map((id) => PHONES.find((p) => pid(p) === id)).filter(Boolean) as typeof PHONES;
  const rows: [string, (p: (typeof PHONES)[0]) => string][] = [
    ["أقل سعر", (p) => formatDZD(bestListing(p).price)],
    ["الشاشة", (p) => p.screen],
    ["المعالج", (p) => p.processor],
    ["RAM", (p) => `${p.ram}GB`],
    ["التخزين", (p) => `${p.storage}GB`],
    ["الكاميرا", (p) => p.camera],
    ["البطارية", (p) => p.battery],
    ["5G", (p) => (p.is5g ? "نعم" : "لا")],
    ["النظام", (p) => p.os],
    ["المحلات", (p) => p.listings.filter((l) => l.inStock).map((l) => shopOf(l.shop)?.name).join("، ") || "—"],
  ];
  return (
    <div>
      <PageHeader title="المقارنة" subtitle="اختر حتى 3 هواتف للمقارنة" />
      {phones.length < 2 ? (
        <div className="rounded-2xl bg-ice p-8 text-center text-sm text-muted-foreground">
          {phones.length === 1 ? "أضف هاتفًا آخر على الأقل للمقارنة." : "لم تضف أي هاتف بعد."}{" "}
          <Link to="/phones" className="font-bold text-primary">تصفح الهواتف</Link>
        </div>
      ) : (
        <div className="no-scrollbar -mx-4 overflow-x-auto px-4">
          <table className="w-full min-w-[480px] border-separate border-spacing-0 overflow-hidden rounded-2xl text-sm ring-1 ring-border">
            <thead>
              <tr>
                <th className="w-24 bg-ice p-3" />
                {phones.map((p) => (
                  <th key={p.slug} className="bg-ice p-3 align-top">
                    <div className="relative">
                      <button onClick={() => cmp.remove(pid(p))} className="absolute -top-1 -left-1 grid size-6 place-items-center rounded-full bg-background ring-1 ring-border" aria-label="إزالة"><X className="size-3" /></button>
                      <img src={p.image} alt={p.model} loading="lazy" width={816} height={816} className="mx-auto size-16 rounded-xl object-cover" />
                      <Link to="/phones/$brand/$slug" params={{ brand: p.brand, slug: p.slug }} className="mt-1 block text-xs font-bold">{p.model}</Link>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(([k, f]) => (
                <tr key={k}>
                  <td className="border-t border-border p-3 text-xs text-muted-foreground">{k}</td>
                  {phones.map((p) => <td key={p.slug} className="border-t border-border p-3 text-center text-xs font-semibold" dir="auto">{f(p)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
