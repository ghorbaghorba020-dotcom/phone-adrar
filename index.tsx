import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { ShopOwnerPitch } from "@/components/shop-pitch";
import { BRANDS, PHONES, SHOPS, DEMO_STATS, hasDrop } from "@/lib/data";
import { PhoneCard, SectionHead, ShopCard } from "@/components/ui-bits";
import hero from "@/assets/hero-phones.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "هواتف أدرار — قارن قبل ما تشري" },
      { name: "description", content: "قارن أسعار الهواتف بين محلات أدرار، شوف المواصفات، وتواصل مباشرة مع المحل. نسخة تجريبية." },
      { property: "og:title", content: "هواتف أدرار — قارن قبل ما تشري" },
      { property: "og:description", content: "كل هواتف أدرار في مكان واحد. قارن الأسعار واختار المحل اللي يناسبك." },
    ],
  }),
  component: Home,
});

const STEPS = ["المحل يضيف المنتجات والأسعار.", "الزبون يبحث عن الهاتف.", "يقارن الأسعار.", "يختار المحل.", "يتواصل مع المحل مباشرة."];

function Home() {
  const [q, setQ] = useState("");
  const nav = useNavigate();
  const offers = PHONES.filter((p) => p.listings.some((l) => l.oldPrice)).slice(0, 6);
  const recent = [...PHONES].sort((a, b) => a.addedDaysAgo - b.addedDaysAgo).slice(0, 4);
  const drops = PHONES.filter(hasDrop).slice(0, 3);
  const popular = [...PHONES].sort((a, b) => b.views - a.views).slice(0, 8);

  return (
    <div className="space-y-10">
      <section className="animate-rise">
        <div className="relative overflow-hidden rounded-3xl bg-hero text-primary-foreground">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="animate-sweep absolute inset-y-0 right-0 w-1/3 bg-primary-foreground/25" />
          </div>
          <div className="relative grid items-center gap-4 p-5 sm:p-10 md:grid-cols-[1.2fr_1fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-3 py-1 text-[11px] font-semibold">قارن قبل ما تشري · نسخة تجريبية</span>
              <h1 className="mt-3 text-[28px] font-black leading-[1.3] tracking-tight text-balance sm:text-5xl">لقّي هاتفك بالسعر المناسب في أدرار</h1>
              <p className="mt-2 text-[13px] leading-relaxed opacity-90 sm:text-base">قارن الأسعار بين المحلات، شوف المواصفات، واختار المحل اللي يناسبك.</p>
              <form onSubmit={(e) => { e.preventDefault(); nav({ to: "/phones", search: { q } }); }} className="mt-5 flex items-center gap-2 rounded-2xl bg-background p-1.5 text-foreground shadow-lg">
                <Search className="ms-2 size-4 shrink-0 text-muted-foreground" />
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="ابحث عن هاتف أو موديل..." className="min-w-0 flex-1 bg-transparent py-1.5 text-sm outline-none placeholder:text-muted-foreground/70" />
                <button className="shrink-0 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground">بحث</button>
              </form>
              <div className="mt-3 flex gap-2 sm:max-w-sm">
                <Link to="/phones" className="flex-1 rounded-xl bg-background py-2.5 text-center text-xs font-bold text-foreground">تصفح الهواتف</Link>
                <Link to="/shops" className="flex-1 rounded-xl bg-primary-foreground/15 py-2.5 text-center text-xs font-bold ring-1 ring-primary-foreground/40">شوف المحلات</Link>
              </div>
            </div>
            <img src={hero} alt="هواتف ذكية حديثة" width={1024} height={1024} className="mx-auto w-full max-w-[260px] rounded-3xl object-cover shadow-2xl ring-1 ring-primary-foreground/20 md:max-w-sm" />
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {DEMO_STATS.map((s) => (
          <div key={s.label} className="rounded-2xl bg-card p-4 text-center shadow-sm ring-1 ring-border">
            <p className="text-2xl font-black text-primary" style={{ fontFamily: "var(--font-display)" }} dir="ltr">{s.value}</p>
            <p className="text-xs font-semibold text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </section>

      <section>
        <SectionHead title="الماركات الشائعة" to="/brands" />
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
          {BRANDS.map((b) => (
            <Link key={b.slug} to="/brands/$brand" params={{ brand: b.slug }} className="shrink-0 rounded-full border border-border bg-card px-4 py-2 text-xs font-bold transition hover:border-primary hover:text-primary" dir="ltr">{b.name}</Link>
          ))}
        </div>
      </section>

      <section>
        <SectionHead title="🔥 عروض اليوم" sub="أسعار تجريبية" to="/offers" />
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">{offers.map((p, i) => <PhoneCard key={p.slug} phone={p} delay={i * 60} />)}</div>
      </section>

      <section>
        <SectionHead title="كيف يخدم Phone Adrar؟" />
        <ol className="grid gap-2 sm:grid-cols-5">
          {STEPS.map((s, i) => (
            <li key={s} className="flex items-center gap-3 rounded-2xl bg-ice p-3 ring-1 ring-border sm:flex-col sm:items-start">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-sm font-black text-primary-foreground">{i + 1}</span>
              <p className="text-sm font-semibold">{s}</p>
            </li>
          ))}
        </ol>
        <p className="mt-2 text-[11px] text-muted-foreground">لا يوجد دفع عبر الإنترنت — المنصة تربط الزبون بالمحل فقط.</p>
      </section>

      <section>
        <SectionHead title="🆕 وصل حديثًا" to="/phones" />
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">{recent.map((p) => <PhoneCard key={p.slug} phone={p} />)}</div>
      </section>

      <section>
        <SectionHead title="📉 انخفاضات الأسعار" sub="أسعار تجريبية" />
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">{drops.map((p) => <PhoneCard key={p.slug} phone={p} />)}</div>
      </section>

      <section>
        <SectionHead title="👀 الأكثر بحثًا" sub="إحصائيات تجريبية" />
        <div className="flex flex-wrap gap-2">
          {popular.map((p) => (
            <Link key={p.slug} to="/phones/$brand/$slug" params={{ brand: p.brand, slug: p.slug }} className="rounded-xl bg-ice px-3 py-2 text-xs font-semibold ring-1 ring-border" dir="ltr">{p.model}</Link>
          ))}
        </div>
      </section>

      <section>
        <SectionHead title="🏪 محلات أدرار" to="/shops" label="كل المحلات" />
        <div className="grid gap-3 md:grid-cols-3">{SHOPS.slice(0, 6).map((s) => <ShopCard key={s.slug} shop={s} />)}</div>
      </section>

      <ShopOwnerPitch />
    </div>
  );
}

