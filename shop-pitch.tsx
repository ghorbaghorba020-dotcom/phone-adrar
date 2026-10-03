import { Link } from "@tanstack/react-router";
import { Store, Eye, MessageCircle, LayoutDashboard } from "lucide-react";
import { JoinDialog, DemoBadge } from "@/components/ui-bits";

export const BENEFITS = [
  { Icon: Store, t: "اعرض منتجاتك", d: "أضف هواتفك وأسعارك بسهولة." },
  { Icon: Eye, t: "خلّي الزبون يلقاك", d: "الزبون يشوف منتجاتك ومعلومات محلك." },
  { Icon: MessageCircle, t: "استقبل زبائن جدد", d: "الزبون يقدر يتواصل معك مباشرة." },
  { Icon: LayoutDashboard, t: "تابع منتجاتك", d: "لوحة تحكم خاصة بمحلّك." },
];

export function ShopOwnerPitch() {
  return (
    <section className="overflow-hidden rounded-3xl bg-foreground p-5 text-background sm:p-10">
      <DemoBadge className="border-background/30 bg-background/10 text-background" label="لأصحاب المحلات" />
      <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-4xl">عندك محل هواتف في أدرار؟</h2>
      <p className="mt-1 text-sm opacity-80">خلّي منتجاتك توصل لعدد أكبر من الزبائن.</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {BENEFITS.map(({ Icon, t, d }, i) => (
          <div key={t} className="rounded-2xl bg-background/5 p-4 ring-1 ring-background/15">
            <div className="flex items-center gap-2"><span className="text-xs font-black opacity-50">0{i + 1}</span><Icon className="size-5 text-primary" /></div>
            <p className="mt-2 font-bold">{t}</p>
            <p className="mt-0.5 text-xs opacity-75">{d}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        <JoinDialog>{(open) => <button onClick={open} className="rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground">أريد الانضمام للموقع</button>}</JoinDialog>
        <Link to="/dashboard" className="rounded-xl px-5 py-3 text-sm font-bold ring-1 ring-background/30">شوف لوحة التحكم التجريبية</Link>
      </div>
    </section>
  );
}
