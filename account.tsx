import { createFileRoute, Link } from "@tanstack/react-router";
import { User, Store } from "lucide-react";
import { PageHeader } from "@/components/ui-bits";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "حسابي | هواتف أدرار" },
      { name: "description", content: "سجّل الدخول لحفظ المفضلة وتنبيهات الأسعار، أو سجّل محلك." },
      { property: "og:title", content: "حسابي | هواتف أدرار" },
      { property: "og:description", content: "حساب الزبون وتسجيل المحلات في هواتف أدرار." },
    ],
  }),
  component: () => (
    <div className="mx-auto max-w-md">
      <PageHeader title="حسابي" />
      <div className="space-y-3">
        <div className="rounded-2xl p-5 ring-1 ring-border">
          <User className="size-6 text-primary" />
          <p className="mt-2 font-bold">تسجيل الدخول قريبًا</p>
          <p className="mt-1 text-sm text-muted-foreground">ستتمكن من مزامنة المفضلة وتفعيل تنبيهات انخفاض الأسعار. حاليًا تُحفظ المفضلة على جهازك.</p>
          <Link to="/favorites" className="mt-3 inline-block rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground">المفضلة</Link>
        </div>
        <div className="rounded-2xl bg-ice p-5 ring-1 ring-border">
          <Store className="size-6 text-primary" />
          <p className="mt-2 font-bold">صاحب محل في أدرار؟</p>
          <p className="mt-1 text-sm text-muted-foreground">لوحة تحكم المحلات لإضافة الهواتف وتحديث الأسعار والمخزون قيد التطوير.</p>
        </div>
      </div>
    </div>
  ),
});
